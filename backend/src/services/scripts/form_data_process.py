import pandas as pd
import json
import sys

# Import required libraries
import pandas as pd
import sys


def get_list(gran1="partenaires", gran2="region"):
    df = pd.read_excel(sys.argv[1], usecols=["partenaires", "region", "ville", "district", "commune", "quartier"]).dropna()
    df[gran1] = df[gran1].str.capitalize()
    df[gran2] = df[gran2].str.capitalize()
    b = []
    for val in df[gran1].unique():
        c = {}
        c[gran1] = val
        value = list(df.loc[df[gran1] == val, gran2].unique())
        tab = list()
        for elt in value:
            tab.append({'value': elt})
        c[gran2] = tab
        b.append(c)
    return b

# def get_list(gran1="partenaires", gran2="region"):
#     # Read relevant columns and drop rows with missing values
#     df = pd.read_excel(sys.argv[1], usecols=["partenaires", "region", "ville", "district", "commune", "quartier"]).dropna()
#     # Convert relevant columns to lowercase
#     df[gran1] = df[gran1].str.capitalize()
#     df[gran2] = df[gran2].str.capitalize()
#     # Create a dictionary to store gran1 and gran2 values
#     result = {}
#     # Loop through unique values of gran1 column
#     for val in df[gran1].unique():
#         # Get unique values of gran2 for the current gran1 value
#         values = df.loc[df[gran1] == val, gran2].unique()
#         # Convert gran2 values to lowercase
#         values = [elt.capitalize() for elt in values]
#         # Add gran2 values to the dictionary
#         result[val] = [{"value": elt} for elt in values]
#     # Return the dictionary
#     return result


def process_partenaire_region():
    result = get_list()
    return result


def process_region_ville():
    result = get_list("region", "ville")
    return result


def process_ville_commune():
    result = get_list("ville", "commune")
    return result


def process_commune_quartier():
    result = get_list("commune", "quartier")
    return result


data = [

    process_partenaire_region(),
    process_region_ville(),
    process_ville_commune(),
    process_commune_quartier()

]
data_json = json.dumps(data)

print(data_json)
