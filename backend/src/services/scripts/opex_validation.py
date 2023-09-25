import pandas as pd
import numpy as np
import sys
from unidecode import unidecode


def format_error(error):
    return '|'.join(error)


class Validation:
    def __init__(self, path, type_fichier):
        self.path = path
        self.type_fichier = type_fichier
        self.present_string = "{} are not present"

    def validation_rule(self):
        regle_string = "◘ REGLE :"
        print("------------------------------------------- Classe de validation des fichiers transmis par orange -------------------------------------------")
        print("◘ FICHIER : Opex ESCO")
        print(regle_string)
        print(
            """ 
        1- Verification de l'existance du sheet <Fichier_de_calcul>
        2- Verification de l'existance des colonnes et de la présences de contenues en leur sein ['code site oci','code site','nom du site','puissance contractuelle audit','o&m','energy','infra','maintenance passive préventive','gardes de sécurité','discount','total redevances ht','tva : 18%','total redevances ttc']
        3- Confirmation que les colonnes ['code site','nom du site','total redevances ht','tva : 18%'] ne possèdes pas de lignes manquantes
        """)
        print("◘ FICHIER : Opex IHS")
        print(regle_string)
        print(
            """ 
            1- Verification de l'existance de sheets dont le nom debute par OCI
            2- Confirmation que les sheets dont le nom debute par OCI ont la même taille sauf 'Old Site ID'
            3- Verification de l'existance de la colonne 'Category'
            4- Verification de l'existance de la categorie dominante dans la liste suivante ['Colocation','MLL','MLL BPCI','ATHENA 1','ATHENA 2','BTS','BARTER','33 SITES TIERS']
        """)
        print("◘ FICHIER : Opex OCI")
        print(regle_string)
        print(
            """ 
            1- verification de l'existance des colonnes ['CODE OCI','SITE','LOCALISATION','PROPRIETAIRE','LOYER ANNUEL','CHARGE','MONTANT IMPOT'] dans le premier sheet
            2- Confirmation que les colonnes ['CODE OCI','SITE','LOCALISATION','PROPRIETAIRE','LOYER ANNUEL','CHARGE','MONTANT IMPOT'] ne sont pas vides 
        """)
        print("◘ FICHIER : Base de données des sites")
        print(regle_string)
        print(
            """ 
            1- verification de l'existance des colonnes ['SITE','SITE BTS','SITE PHYSIQUE','CODE OCI','CODE ESCO','CODE IHS','LONGITUDE','LATITUDE','PROPRIETAIRE','GESTIONNAIRE','GEO LOCALITE','COMMUNE','DEPARTEMENT','REGION','DISTRICT','PARTENAIRES','LOCALISATION','VILLE','QUARTIER','TYPE'] dans le premier sheet
            2- Confirmation que les colonnes ['SITE','SITE BTS','SITE PHYSIQUE','CODE OCI','CODE ESCO','CODE IHS','LONGITUDE','LATITUDE','PROPRIETAIRE','GESTIONNAIRE','GEO LOCALITE','COMMUNE','DEPARTEMENT','REGION','DISTRICT','PARTENAIRES','LOCALISATION','VILLE','QUARTIER','TYPE'] ne sont pas vides 
            3- verifier qu'il y a au moins 2000 unique code oci
        """)
        print("◘ FICHIER : Action techniques")
        print(regle_string)
        print(
            """ 
            1- verification de l'existance des colonnes ['Date','Code_site','Site','Type d'action','Date d'intégration'] dans le premier sheet
            2- Confirmation que les colonnes ['Date','Code_site','Site','Type d'action','Date d'intégration'] ne sont pas vides 
        """)
        print("◘ FICHIER : Chiffre d'affaire des sites")
        print(regle_string)
        print(
            """ 
            1- verification de l'existance des colonnes ['MONTH_ID','ID_SITE','CA_VOIX','CA_DATA'] dans le premier sheet
            2- Confirmation que les colonnes ['MONTH_ID','ID_SITE','CA_VOIX','CA_DATA'] ne sont pas vides 
        """)
        print("◘ FICHIER : Parc sites")
        print(regle_string)
        print(
            """ 
            1- verification de l'existance des colonnes ['MONTH_ID','ID_SITE','PARC','PARC DATA','CODE OCI'] dans le premier sheet
            2- Confirmation que les colonnes ['MONTH_ID','ID_SITE','PARC','PARC DATA','CODE OCI'] ne sont pas vides
        """)

    def validaton_opex_esco(self):
        """
        Fonction qui sers à valider les opex esco.
        Les règles sont:
        1- Verification de l'existance du sheet <Fichier_de_calcul>
        2- Verification de l'existance des colonnes et de la présences de contenues en leur sein ['code site oci','code site','nom du site','puissance contractuelle audit','o&m','energy','infra','maintenance passive préventive','gardes de sécurité','discount','total redevances ht','tva : 18%','total redevances ttc']
        3- Confirmation que les colonnes ['code site','nom du site','total redevances ht','tva : 18%'] ne possèdes pas de lignes manquantes
        """
        errors = []
        if "Fichier_de_calcul" in pd.ExcelFile(self.path).sheet_names:
            selected_cols = ["code site oci", "code site", "nom du site", "puissance contractuelle audit", "o&m", "energy", "infra",
                             "maintenance passive préventive", "gardes de sécurité", "discount", "total redevances ht", "tva : 18%", "total redevances ttc"]
            selected_cols_without_discount = [
                col for col in selected_cols if col != 'discount']

            df = pd.read_excel(
                self.path, sheet_name="Fichier_de_calcul", skiprows=[0, 1, 2])
            df.columns = df.columns.str.strip()
            df.columns = [col.lower() for col in df.columns]
            col_not_existed = [
                col for col in selected_cols if col not in df.columns]
            if len(col_not_existed) == 0:
                last_df = df[selected_cols]
                empty = last_df.any()
                check_empty = [
                    col for col in selected_cols_without_discount if not empty[col]]

                nan_percentages = df[selected_cols_without_discount].isna(
                ).sum() / len(df)
                errors.extend(["{} has NaN value percentage greater than 0.25".format(
                    col) for col, nan_percentage in nan_percentages.items() if nan_percentage > 0.25])

                if check_empty:
                    errors.append("{} are empty".format(check_empty))
            else:
                errors.append(self.present_string.format(col_not_existed))
        else:
            errors.append("sheet <Fichier_de_calcul> does not exist")

        if errors:
            print("bad")
            print(format_error(errors))
        else:
            print("good")

    def validation_opex_ihs(self):
        """
        Function to validate opex IHS.
        The rules are:
        1- Verification of the existence of sheets whose name starts with OCI
        2- Confirmation that the sheets whose name starts with OCI have the same size except for 'Old Site ID'
        3- Verification of the existence of the column 'Category'
        4- Verification of the existence of the dominant category in the following list ['Colocation','MLL','MLL BPCI','ATHENA 1','ATHENA 2','BTS','BARTER','33 SITES TIERS']
        """
        df = pd.ExcelFile(self.path)
        sheets = df.sheet_names
        selected = [
            sheet for sheet in sheets if sheet.lower().startswith("oci")]
        errors = []

        if len(selected) > 0:
            for sheet in selected:
                if sheet.lower().startswith("oci-coloc"):
                    df_parsed = pd.read_excel(
                        self.path, sheet, header=1, skiprows=13)
                else:
                    df_parsed = pd.read_excel(
                        self.path, sheet, header=1, skiprows=14)

                df_parsed.columns = [col.lower() for col in df_parsed.columns]
                df_parsed = df_parsed.drop(['old site id'], axis=1)
                any_value = df_parsed.any().tolist()
                unnamed_col = [i for i, value in enumerate(
                    any_value) if not value]

                if len(unnamed_col) != 0:
                    df_parsed = df_parsed.iloc[:, :unnamed_col[0]]

                if df_parsed.count().mean() == df_parsed.shape[0]:
                    if 'category' not in df_parsed.columns:
                        errors.append(
                            f"Columns 'category' does not exist in {sheet}")
                    for col in df_parsed.columns:
                        nan_percentage = df_parsed[col].isna(
                        ).sum() / len(df_parsed[col])
                        if nan_percentage > 0.25:
                            errors.append(
                                f"{col} has NaN value percentage greater than 0.25 in sheet {sheet}")
                else:
                    diff = df_parsed.count().mean() - df_parsed.shape[0]
                    if diff > 0:
                        errors.append(
                            f"Number of rows is less than {sheet}'s total number of rows")
                    else:
                        errors.append(
                            f"Number of rows is more than {sheet}'s total number of rows")
        else:
            errors.append("No sheet name starts with OCI")

        if len(errors) > 0:
            print('bad')
            print(format_error(errors))
        else:
            print("good")

    def validation_base_site(self, list_col: list, sheet_name=None, skiprows=None):
        if sheet_name:
            if skiprows:
                df = pd.read_excel(self.path, sheet_name,
                                   header=1, skiprows=skiprows)
            else:
                df = pd.read_excel(self.path, sheet_name)
        else:
            df = pd.read_excel(self.path)

        df.columns = df.columns.str.strip().str.upper().map(unidecode)
        list_col = [unidecode(col.upper()) for col in list_col]

        errors = []

        col_not_existed = set(list_col) - set(df.columns)
        if col_not_existed:
            errors.append(self.present_string.format(col_not_existed))

        nan_percentage = df.isna().sum() / len(df)
        nan_percentage = nan_percentage.drop(['CODE ESCO', 'CODE IHS'])
        nan_percentage = nan_percentage[nan_percentage != 0]
        for col, percentage in nan_percentage.items():
            errors.append(f"{col} column has {percentage:.2%} NaN value")

        if "CODE OCI" in list_col and len(df["CODE OCI"]) < 2000:
            errors.append("we don't have 2000 rows in the file")

        ihs_present = df.loc[(df['PROPRIETAIRE'] == "IHS")
                             & df['CODE IHS'].isnull()].index
        if ihs_present:
            errors.append("Some site managed by IHS haven't CODE IHS")

        if errors:
            print('bad')
            print(format_error(errors))
        else:
            print("good")

    def validation_classique(self, list_col: list, sheet_name=None, skiprows=None):
        if sheet_name:
            if skiprows:
                df = pd.read_excel(self.path, sheet_name,
                                   header=1, skiprows=skiprows)
            else:
                df = pd.read_excel(self.path, sheet_name)
        else:
            df = pd.read_excel(self.path)

        df.columns = df.columns.str.strip()
        columns = [unidecode(col) for col in df.columns.str.upper()]
        df.columns = columns
        list_col = [unidecode(col) for col in list_col]
        must_existed_col = [col.upper() for col in list_col]
        errors = []

        col_not_existed = [
            col for col in must_existed_col if col not in df.columns]
        if col_not_existed:
            errors.append(self.present_string.format(col_not_existed))

        existed = [col for col in must_existed_col if col not in col_not_existed]
        if existed:
            col_not_empty = [col for col in existed if df[col].empty]
            if col_not_empty:
                errors.append("{} are empty".format(col_not_empty))

            nan_percentage = df[existed].isna().sum() / len(df)
            high_nan_cols = nan_percentage[nan_percentage > 0.25].index.tolist(
            )
            if high_nan_cols:
                errors.append(
                    "{} has NaN value percentage greater than 0.25".format(high_nan_cols))

        if errors:
            print('bad')
            print(format_error(errors))
        else:
            print("good")

    def main(self):

        if self.type_fichier == "OPEX_ESCO" or self.type_fichier == "ANNEXE_OPEX_ESCO":
            self.validaton_opex_esco()
        if self.type_fichier == "OPEX_IHS":
            self.validation_opex_ihs()

        if self.type_fichier == "BASE_SITES":
            self.validation_base_site(["SITE", "SITE BTS", "SITE PHYSIQUE", "CODE OCI", "CODE ESCO", "CODE IHS", "LONGITUDE", "LATITUDE", "PROPRIETAIRE",
                                       "GESTIONNAIRE", "GEO LOCALITE", "COMMUNE", "DEPARTEMENT", "REGION", "DISTRICT", "PARTENAIRES", "LOCALISATION", "VILLE", "QUARTIER", "TYPE DU SITE"])

        if self.type_fichier == "OPEX_OCI":
            self.validation_classique(["CODE OCI", "SITE", "LOCALISATION", "PROPRIETAIRE",
                                       "LOYER ANNUEL", "CHARGE", "MONTANT IMPOT"], "ETAT BAUX OCI", 5)

        if self.type_fichier == "ACTION_TECH":
            self.validation_classique(
                ["Date", "Code_site", "Site", "Type d\'action", "Date d\'intégration"])

        if self.type_fichier == "CA_SITES":
            self.validation_classique(
                ["MONTH_ID", "ID_SITE", "CA_VOIX", "CA_DATA"])

        if self.type_fichier == "PARC_SITES":
            self.validation_classique(
                ["MONTH_ID", "ID_SITE", "PARC", "PARC DATA", "CODE OCI"])

        if self.type_fichier == "CONGESTION":
            self.validation_classique(["PERIODE", "CODE_SITE", "ID_Site", "Site",
                                       "ID_UA", "UA_OBJ_ID", "UA", "ID_REGION", "Region", "ID_ZC",
                                      "Zone_Commerciale", "Longitude", "Latitude",
                                       "Cellules_2G", "Cellules_2G_congestionnées",
                                       "Cellules_3G", "Cellules_3G_congestionnées",
                                       "Cellules_4G", "Cellules_4G_congestionnées",
                                       "Taux_congestion_2G", "Taux_congestion_3G", "Taux_congestion_4G"])


validation = Validation(sys.argv[1], sys.argv[2])

validation.main()
