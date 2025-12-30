import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle
import json
import requests
import io
import os

# 1. Download Dataset
url = "https://raw.githubusercontent.com/rajuzumaki2207/Bangalore_house_prediction/master/Bengaluru_House_Data.csv"
print(f"Downloading dataset from {url}...")
try:
    s = requests.get(url).content
    df = pd.read_csv(io.StringIO(s.decode('utf-8')))
    print("Dataset downloaded. Shape:", df.shape)
except Exception as e:
    print(f"Error downloading dataset: {e}")
    exit(1)

# Clean column names
df.columns = [c.strip().lower() for c in df.columns]

# 2. Data Cleaning
cols_to_drop = ['area_type','society','balcony','availability']
existing_cols_to_drop = [c for c in cols_to_drop if c in df.columns]
df2 = df.drop(existing_cols_to_drop, axis='columns')
df3 = df2.dropna()

size_col = 'size'
if size_col not in df3.columns:
    for c in df3.columns:
        if 'size' in c:
            size_col = c
            break
df3['bhk'] = df3[size_col].apply(lambda x: int(x.split(' ')[0]))

def convert_sqft_to_num(x):
    tokens = x.split('-')
    if len(tokens) == 2:
        return (float(tokens[0]) + float(tokens[1])) / 2
    try:
        return float(x)
    except:
        return None

df4 = df3.copy()
df4['total_sqft'] = df4['total_sqft'].apply(convert_sqft_to_num)
df4 = df4[df4.total_sqft.notnull()]

df5 = df4.copy()
df5.location = df5.location.apply(lambda x: str(x).strip())
location_stats = df5.groupby('location')['location'].agg('count').sort_values(ascending=False)
location_stats_less_than_10 = location_stats[location_stats <= 10]
df5.location = df5.location.apply(lambda x: 'other' if x in location_stats_less_than_10 else x)

# Outlier Removal BEFORE One Hot Encoding (so we have 'location')
# 1. Remove rows where sqft/bhk < 300
df5 = df5[~(df5.total_sqft/df5.bhk < 300)]

# 2. Remove Price Per Sqft Outliers per Location
df5['price_per_sqft'] = df5['price']*100000/df5['total_sqft']

def remove_pps_outliers(df):
    df_out = pd.DataFrame()
    for key, subdf in df.groupby('location'):
        m = np.mean(subdf.price_per_sqft)
        st = np.std(subdf.price_per_sqft)
        reduced_df = subdf[(subdf.price_per_sqft > (m-st)) & (subdf.price_per_sqft <= (m+st))]
        df_out = pd.concat([df_out, reduced_df], ignore_index=True)
    return df_out

df6 = remove_pps_outliers(df5)

# 3. One Hot Encoding
dummies = pd.get_dummies(df6.location)
df7 = pd.concat([df6, dummies.drop('other', axis='columns')], axis='columns')

# 4. Final Cleanup
df8 = df7.drop(['location', size_col, 'price_per_sqft'], axis='columns')

# 5. Model Building
X = df8.drop('price', axis='columns')
y = df8.price

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=10)

lr_clf = LinearRegression()
lr_clf.fit(X_train, y_train)
score = lr_clf.score(X_test, y_test)
print(f"Model Trained. R2 Score: {score}")

# 6. Save Model
with open('model.pkl', 'wb') as f:
    pickle.dump(lr_clf, f)

columns = {
    'data_columns': [col.lower() for col in X.columns]
}
with open('columns.json', 'w') as f:
    f.write(json.dumps(columns))

print("Model and columns saved successfully.")
