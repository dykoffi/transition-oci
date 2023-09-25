import unittest
from ..opex_validation import Validation

class ValidationTestCase(unittest.TestCase):
    def test_validaton_opex_esco(self):
        # Positive test case
        validation = Validation("path/to/opex_esco_file.xlsx", "OPEX_ESCO")
        validation.validaton_opex_esco()
        self.assertEqual(validation.output, "good")

        # Negative test case - sheet <Fichier_de_calcul> does not exist
        validation = Validation("path/to/invalid_file.xlsx", "OPEX_ESCO")
        validation.validaton_opex_esco()
        self.assertEqual(validation.output, "bad")
        self.assertEqual(validation.errors, ["sheet <Fichier_de_calcul> does not exist"])

        # Negative test case - missing columns
        validation = Validation("path/to/invalid_file.xlsx", "OPEX_ESCO")
        validation.validaton_opex_esco()
        self.assertEqual(validation.output, "bad")
        self.assertEqual(validation.errors, ["['code site oci', 'code site', 'nom du site', 'puissance contractuelle audit', 'o&m', 'energy', 'infra', 'maintenance passive préventive', 'gardes de sécurité', 'discount', 'total redevances ht', 'tva : 18%', 'total redevances ttc'] are not present"])

if __name__ == '__main__':
    unittest.main()