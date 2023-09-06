import { NomanclatureValidation } from "./file.validator.service";

describe('file validator',()=> {

    it('nomenclature validator file OPEX_ESCO', ()=> {
        const folder = "OPEX_ESCO";
        const filename = "OCI_Facture_Octobre_2022_Nouveau Catalogue";
        expect(NomanclatureValidation(folder,filename)).toEqual(true)
    })

    it('nomenclature validator file OPEX_OCI', ()=> {
        const folder = "OPEX_OCI";
        const filename = "Etat des baux au 29-12-2022";
        expect(NomanclatureValidation(folder,filename)).toEqual(true)
    })

    it('nomenclature validator file OPEX_IHS', ()=> {
        const folder = "OPEX_IHS";
        const filename = "SITES ORANGE A FACTURER   Q3 - JUILLET 22";
        expect(NomanclatureValidation(folder,filename)).toEqual(true)
    })

    it('nomenclature validator file BASE_SITES', ()=> {
        const folder = "BASE_SITES";
        const filename = "Base de donnees des sites OCI_31122022";
        expect(NomanclatureValidation(folder,filename)).toEqual(true)
    })

    it('nomenclature validator file ACTION_TECH', ()=> {
        const folder = "ACTION_TECH";
        const filename = "action_techniques_janvier_2023";
        expect(NomanclatureValidation(folder,filename)).toEqual(true)
    })
})