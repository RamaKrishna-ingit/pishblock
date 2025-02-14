import pandas as pd
import numpy as np
from urllib.parse import urlparse

class URLFeatureExtractor:
    def __init__(self, url):
        self.url = url
        self.parsed_url = urlparse(url)

    def extract_features(self):
        return {
            'url_length': len(self.url),
            'domain_length': len(self.parsed_url.netloc),
            'path_length': len(self.parsed_url.path),
            'has_https': 1 if self.parsed_url.scheme == 'https' else 0,
            'num_dots': self.url.count('.'),
            'num_hyphens': self.url.count('-')
        }

def process_dataset(file_path):
    df = pd.read_csv(file_path)
    df_features = df['url'].apply(lambda x: pd.Series(URLFeatureExtractor(x).extract_features()))
    df = pd.concat([df, df_features], axis=1).drop(columns=['url'])
    return df

if __name__ == "__main__":
    processed_data = process_dataset("dataset.csv")
    processed_data.to_csv("processed_dataset.csv", index=False)
