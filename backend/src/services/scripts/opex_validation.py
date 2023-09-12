import pandas as pd
import numpy as np
import sys
from unidecode import *


def format_error(error):
    return '|'.join(error)


class Validation:
    def __init__(self, path, type_fichier):
        self.path = path
        self.type_fichier = type_fichier

    def validationRule(self):
        print("------------------------------------------- Classe de validation des fichiers transmis par orange -------------------------------------------")
        print("◘ FICHIER : Opex ESCO")
        print("◘ REGLE :")
        print(
            """ 
        1- Verification de l'existance du sheet <Fichier_de_calcul>
        2- Verification de l'existance des colonnes et de la présences de contenues en leur sein ['code site oci','code site','nom du site','puissance contractuelle audit','o&m','energy','infra','maintenance passive préventive','gardes de sécurité','discount','total redevances ht','tva : 18%','total redevances ttc']
        3- Confirmation que les colonnes ['code site','nom du site','total redevances ht','tva : 18%'] ne possèdes pas de lignes manquantes
        """)
        print("◘ FICHIER : Opex IHS")
        print("◘ REGLE :")
        print(
            """ 
            1- Verification de l'existance de sheets dont le nom debute par OCI
            2- Confirmation que les sheets dont le nom debute par OCI ont la même taille sauf 'Old Site ID'
            3- Verification de l'existance de la colonne 'Category'
            4- Verification de l'existance de la categorie dominante dans la liste suivante ['Colocation','MLL','MLL BPCI','ATHENA 1','ATHENA 2','BTS','BARTER','33 SITES TIERS']
        """)
        print("◘ FICHIER : Opex OCI")
        print("◘ REGLE :")
        print(
            """ 
            1- verification de l'existance des colonnes ['CODE OCI','SITE','LOCALISATION','PROPRIETAIRE','LOYER ANNUEL','CHARGE','MONTANT IMPOT'] dans le premier sheet
            2- Confirmation que les colonnes ['CODE OCI','SITE','LOCALISATION','PROPRIETAIRE','LOYER ANNUEL','CHARGE','MONTANT IMPOT'] ne sont pas vides 
        """)
        print("◘ FICHIER : Base de données des sites")
        print("◘ REGLE :")
        print(
            """ 
            1- verification de l'existance des colonnes ['SITE','SITE BTS','SITE PHYSIQUE','CODE OCI','CODE ESCO','CODE IHS','LONGITUDE','LATITUDE','PROPRIETAIRE','GESTIONNAIRE','GEO LOCALITE','COMMUNE','DEPARTEMENT','REGION','DISTRICT','PARTENAIRES','LOCALISATION','VILLE','QUARTIER','TYPE'] dans le premier sheet
            2- Confirmation que les colonnes ['SITE','SITE BTS','SITE PHYSIQUE','CODE OCI','CODE ESCO','CODE IHS','LONGITUDE','LATITUDE','PROPRIETAIRE','GESTIONNAIRE','GEO LOCALITE','COMMUNE','DEPARTEMENT','REGION','DISTRICT','PARTENAIRES','LOCALISATION','VILLE','QUARTIER','TYPE'] ne sont pas vides 
            3- verifier qu'il y a au moins 2000 unique code oci
        """)
        print("◘ FICHIER : Action techniques")
        print("◘ REGLE :")
        print(
            """ 
            1- verification de l'existance des colonnes ['Date','Code_site','Site','Type d'action','Date d'intégration'] dans le premier sheet
            2- Confirmation que les colonnes ['Date','Code_site','Site','Type d'action','Date d'intégration'] ne sont pas vides 
        """)
        print("◘ FICHIER : Chiffre d'affaire des sites")
        print("◘ REGLE :")
        print(
            """ 
            1- verification de l'existance des colonnes ['MONTH_ID','ID_SITE','CA_VOIX','CA_DATA'] dans le premier sheet
            2- Confirmation que les colonnes ['MONTH_ID','ID_SITE','CA_VOIX','CA_DATA'] ne sont pas vides 
        """)
        print("◘ FICHIER : Parc sites")
        print("◘ REGLE :")
        print(
            """ 
            1- verification de l'existance des colonnes ['MONTH_ID','ID_SITE','PARC','PARC DATA','CODE OCI'] dans le premier sheet
            2- Confirmation que les colonnes ['MONTH_ID','ID_SITE','PARC','PARC DATA','CODE OCI'] ne sont pas vides
        """)

    def validatonOpexEsco(self):
        """
        Fonction qui sers à valider les opex esco.
        Les règles sont:
        1- Verification de l'existance du sheet <Fichier_de_calcul>
        2- Verification de l'existance des colonnes et de la présences de contenues en leur sein ['code site oci','code site','nom du site','puissance contractuelle audit','o&m','energy','infra','maintenance passive préventive','gardes de sécurité','discount','total redevances ht','tva : 18%','total redevances ttc']
        3- Confirmation que les colonnes ['code site','nom du site','total redevances ht','tva : 18%'] ne possèdes pas de lignes manquantes
        """
        excel = pd.ExcelFile(self.path)
        sheets = excel.sheet_names
        errors = []
        if "Fichier_de_calcul" in sheets:
            df = excel.parse("Fichier_de_calcul", skiprows=[0, 1, 2])
            df = df.drop(df.columns[39:], axis=1)
            df = df.dropna(thresh=df.shape[1]*0.7)
            # mettre en minuscle
            selected_cols = ["code site oci", "code site", "nom du site", "puissance contractuelle audit", "o&m", "energy", "infra",
                             "maintenance passive préventive", "gardes de sécurité", "discount", "total redevances ht", "tva : 18%", "total redevances ttc"]
            full_cols = ["code site", "nom du site",
                         "total redevances ht", "tva : 18%"]
            selected_cols_without = [
                col for col in selected_cols if col != 'discount']
            df.columns = df.columns.str.strip()
            columns = [x.lower() for x in df.columns]
            col_not_existed = [i for i in selected_cols if i not in columns]
            if len(col_not_existed) == 0:
                df.columns = columns
                last_df = df.loc[:, selected_cols]

                full = last_df.all()
                empty = last_df.any()
                check_empty = [
                    x for x in selected_cols_without if empty[x] == False]

                for col in selected_cols_without:
                    nan_percentage = df[col].isna().sum() / len(df[col])
                    if nan_percentage > 0.25:
                        errors.append(
                            "{} has NaN value percentage greater than 0.25".format(col))
                check_full = [x for x in full_cols if full[x] == False]

                if check_empty:
                    errors.append("{} are empty".format(check_empty))
                # if check_full:
                #     errors.append('{} are not full'.format(check_full))
            else:
                errors.append("{} are not present".format(col_not_existed))
        else:
            errors.append("sheet <Fichier_de_calcul> not exist")

        if len(errors) > 0:
            print("bad")
            print(format_error(errors))
        else:
            print("good")

    def validationOpexIhs(self):
        """
            Fonction qui sers à valider les opex IHS.
            Les règles sont:
            1- Verification de l'existance de sheets dont le nom debute par OCI
            2- Confirmation que les sheets dont le nom debute par OCI ont la même taille sauf 'Old Site ID'
            3- Verification de l'existance de la colonne 'Category'
            4- Verification de l'existance de la categorie dominante dans la liste suivante ['Colocation','MLL','MLL BPCI','ATHENA 1','ATHENA 2','BTS','BARTER','33 SITES TIERS']

        """

        df = pd.ExcelFile(self.path)
        sheets = df.sheet_names
        sheets_lower = [x.lower() for x in df.sheet_names]
        selected: list[str] = []
        errors = []

        for i in range(len(sheets)):
            if sheets_lower[i].startswith("oci"):
                selected.append(sheets[i])
        if len(selected) > 0:

            for i in range(len(selected)):

                # df_parsed = df_parsed.drop(["Old Site ID"], axis=1)
                if selected[i].lower().startswith("oci-coloc"):
                    df_parsed = pd.read_excel(
                        self.path, selected[i], header=1, skiprows=13)
                    df_parsed.columns = [x.lower() for x in df_parsed.columns]
                    df_parsed = df_parsed.drop(["old site id"], axis=1)
                    any_value = df_parsed.any().tolist()
                    unnamed_col = [i for i, x in enumerate(
                        any_value) if x == False]
                    if len(unnamed_col) != 0:
                        df_parsed = df_parsed[df_parsed.columns[0:unnamed_col[0]]]
                else:
                    df_parsed = pd.read_excel(
                        self.path, selected[i], header=1, skiprows=14)
                    df_parsed.columns = [x.lower() for x in df_parsed.columns]
                    df_parsed = df_parsed.drop(['old site id'], axis=1)
                    any_value = df_parsed.any().tolist()
                    unnamed_col = [i for i, x in enumerate(
                        any_value) if x == False]
                    if len(unnamed_col) != 0:
                        df_parsed = df_parsed[df_parsed.columns[0:unnamed_col[0]]]
                if int(df_parsed.count().mean()) == df_parsed.shape[0]:
                    if 'category' not in df_parsed.columns:
                        errors.append(
                            "columns category not exists in {}".format(selected[i]))
                    for col in df_parsed.columns:

                        nan_percentage = df_parsed[col].isna(
                        ).sum() / len(df_parsed[col])
                        if nan_percentage > 0.25:
                            errors.append(
                                "{} has NaN value percentage greater than 0.25 in sheet {}".format(col, selected[i]))
                    # if "category" in df_parsed.columns:
                    #     if df_parsed["category"].max() not in category:
                    #         errors.append("category {} not exists".format(
                    #             df_parsed["category"].max()))

                    # else:
                    #     errors.append(
                    #         "columns category not exists in {}".format(selected[i]))
                else:
                    diff = int(df_parsed.count().mean()) - df_parsed.shape[0]
                    if diff > 0:
                        errors.append(
                            "columns number of row is less than {} total number of row".format(selected[i]))
                    else:
                        errors.append(
                            "columns number of row is more than {} total number of row".format(selected[i]))
        else:
            errors.append("no sheet name start with OCI")
        if len(errors) > 0:
            print('bad')
            print(format_error(errors))
        else:
            print("good")

    def validationBaseSite(self, list_col: list, sheet_name=None, skiprows=None):

        if sheet_name:
            if skiprows:
                df = pd.read_excel(self.path, sheet_name,
                                   header=1, skiprows=skiprows)
            else:
                df = pd.read_excel(self.path, sheet_name)
        else:
            df = pd.read_excel(self.path)
        df.columns = df.columns.str.strip()
        columns = [x.upper() for x in df.columns]
        columns = [unidecode(col) for col in columns]
        df.columns = columns
        list_col = [unidecode(col) for col in list_col]

        must_existed_col = [x.upper() for x in list_col]
        errors = []
        col_not_existed = [
            col for col in must_existed_col if col not in df.columns]

        # regle 1
        if len(col_not_existed) > 0:
            errors.append("{} are not present".format(col_not_existed))

        existed = [x for x in must_existed_col if x not in col_not_existed]
        if len(existed) > 0:
            for col in existed:
                nan_percentage: int = df[col].isna().sum() / len(df[col])

                # 100% de complétude (regle 2 )
                if col not in ['CODE ESCO', 'CODE IHS']:
                    if nan_percentage != 0:
                        errors.append(
                            "{} colum has some NaN value ".format(col))

        # règle 3
        if "CODE OCI" in existed and df["CODE OCI"].count() < 2000:
            errors.append("we don\'t have 2000 rows in the file ")

        # règle 4
        ihs_present = [index for index, value in enumerate(
            df['PROPRIETAIRE']) if value == "IHS" and pd.isnull(df['CODE IHS'][index])]
        if len(ihs_present) > 0:
            errors.append("Some site managed by IHS haven't CODE IHS")

        if len(errors) > 0:
            print('bad')
            print(format_error(errors))
        else:
            print("good")

    def validationClassique(self, list_col: list, sheet_name=None, skiprows=None):
        if sheet_name:
            if skiprows:
                df = pd.read_excel(self.path, sheet_name,
                                   header=1, skiprows=skiprows)
            else:
                df = pd.read_excel(self.path, sheet_name)
        else:
            df = pd.read_excel(self.path)
        df.columns = df.columns.str.strip()
        columns = [x.upper() for x in df.columns]
        columns = [unidecode(col) for col in columns]
        df.columns = columns
        list_col = [unidecode(col) for col in list_col]

        must_existed_col = [x.upper() for x in list_col]
        errors = []
        col_not_existed = [
            col for col in must_existed_col if col not in df.columns]

        if len(col_not_existed) > 0:
            errors.append("{} are not present".format(col_not_existed))

        existed = [x for x in must_existed_col if x not in col_not_existed]
        if len(existed) > 0:
            col_not_empty = [col for col in existed if df[col].empty == True]
            if len(col_not_empty) > 0:
                errors.append("{} are empty".format(col_not_empty))

            for col in existed:
                nan_percentage = df[col].isna().sum() / len(df[col])

                if nan_percentage > 0.25:
                    errors.append(
                        "{} has NaN value percentage greater than 0.25".format(col))

        if len(errors) > 0:
            print('bad')
            print(format_error(errors))
        else:
            print("good")

    def main(self):

        if self.type_fichier == "OPEX_ESCO" or self.type_fichier == "ANNEXE_OPEX_ESCO":
            self.validatonOpexEsco()
        if self.type_fichier == "OPEX_IHS":
            self.validationOpexIhs()

        if self.type_fichier == "BASE_SITES":
            self.validationBaseSite(["SITE", "SITE BTS", "SITE PHYSIQUE", "CODE OCI", "CODE ESCO", "CODE IHS", "LONGITUDE", "LATITUDE", "PROPRIETAIRE",
                                     "GESTIONNAIRE", "GEO LOCALITE", "COMMUNE", "DEPARTEMENT", "REGION", "DISTRICT", "PARTENAIRES", "LOCALISATION", "VILLE", "QUARTIER", "TYPE DU SITE"])

        if self.type_fichier == "OPEX_OCI":
            self.validationClassique(["CODE OCI", "SITE", "LOCALISATION", "PROPRIETAIRE",
                                     "LOYER ANNUEL", "CHARGE", "MONTANT IMPOT"], "ETAT BAUX OCI", 5)

        if self.type_fichier == "ACTION_TECH":
            self.validationClassique(
                ["Date", "Code_site", "Site", "Type d\'action", "Date d\'intégration"])

        if self.type_fichier == "CA_SITES":
            self.validationClassique(
                ["MONTH_ID", "ID_SITE", "CA_VOIX", "CA_DATA"])

        if self.type_fichier == "PARC_SITES":
            self.validationClassique(
                ["MONTH_ID", "ID_SITE", "PARC", "PARC DATA", "CODE OCI"])

        if self.type_fichier == "CONGESTION":
            self.validationClassique(["PERIODE", "CODE_SITE", "ID_Site", "Site",
                                     "ID_UA", "UA_OBJ_ID", "UA", "ID_REGION", "Region", "ID_ZC",
                                      "Zone_Commerciale", "Longitude", "Latitude",
                                      "Cellules_2G", "Cellules_2G_congestionnées",
                                      "Cellules_3G", "Cellules_3G_congestionnées",
                                      "Cellules_4G", "Cellules_4G_congestionnées",
                                      "Taux_congestion_2G", "Taux_congestion_3G", "Taux_congestion_4G"])


validation = Validation(sys.argv[1], sys.argv[2])

validation.main()
