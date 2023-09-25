import {
  Group,
  Text,
  useMantineTheme,
  UnstyledButton,
  Tooltip,
  Select,
  Button,
  LoadingOverlay,
  rem,
} from '@mantine/core';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, MIME_TYPES, FileWithPath } from '@mantine/dropzone';
import { MonthPickerInput } from '@mantine/dates';
import Excell from '../assets/excel.png';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { RootState } from '../config/store/store';
import Send2 from '../assets/send2.png';

interface LoadFileProps extends Partial<DropzoneProps> {
  loadFile?: () => void;
}
export function LoadFile(props: LoadFileProps) {
  const theme = useMantineTheme();
  const [sucess, setSucess] = useState(false);
  const [visible, setVisible] = useState(false);

  const state = useSelector((state: RootState) => state.user);
  const user = JSON.parse(state.info);
  const user_role = JSON.parse(state.roles);
  const keycloak_client = import.meta.env.VITE_KEYCLOAK_CLIENT
  const role = user_role[keycloak_client] ? user_role[keycloak_client].roles : [];
  const [file, setFile] = useState<FileWithPath>();
  const form = useForm({
    initialValues: {
      origine: '',
      date_range: [],
    },
    validate: {
      date_range: (value) => value.length === 0 && 'la date doit être saisie',
      origine: (value) => value.length === 0 && 'l`origine du fichier doit être saisi',
    },
  });

  const upload_data = [];

  if (role.includes('upload_bdd_site')) {
    upload_data.push({ value: 'BASE_SITES', label: 'Base de données des sites' })
  }
  if (role.includes('upload_opex_ihs_esco_file')) {
    upload_data.push({ value: 'OPEX_ESCO', label: 'OPEX ESCO' })
  }
  if (role.includes('upload_opex_ihs_esco_file')) {
    upload_data.push({ value: 'OPEX_IHS', label: 'OPEX IHS' })
  }
  if (role.includes('uplaod_ca_file')) {
    upload_data.push({ value: 'CA_SITES', label: 'CA SITES' })
  }
  if (role.includes('upload_parc_site_file')) {
    upload_data.push({ value: 'PARC_SITES', label: 'Parc par site' })
  }
  if (role.includes('upload_action_com_file')) {
    upload_data.push({ value: 'ACTION_COM', label: 'Actions Commerciales' })
  }
  if (role.includes('upload_action_tech_file')) {
    upload_data.push({ value: 'ACTION_TECH', label: 'Actions techniques' })
  }
  if (role.includes('upload_congestion_file')) {
    upload_data.push({ value: 'CONGESTION', label: 'Congestion' })
  }
  if (role.includes('upload_annexe_opex_esco')) {
    upload_data.push({ value: 'ANNEXE_OPEX_ESCO', label: 'ANNEXE OPEX ESCO' })
  }

  const uploadFile = async (values: { origine: string; date_range: (Date | null)[] }) => {
    const formData = new FormData();
    const folder = values.origine;

    file && formData.append('file', file, file.name)

    const send_date = values.date_range.map((dt) => ({
      year: dt?.getFullYear(),
      month:
        dt === null
          ? 1
          : (dt.getMonth() + 1).toLocaleString('fr-FR', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }),
    }));
    formData.append('folder', folder);
    formData.append('date_range', JSON.stringify(send_date));
    console.log();

    formData.append('user_id', user.email);
    setVisible(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BASE_URL_API + '/minio', formData);

      if (response.data.errors == null) {
        props.loadFile;
        notify('Le fichier a été uploadé avec succès', 'sucess');
      } else {
        const errors: Array<string> = response.data.errors;
        errors.forEach((elt) => {
          return notify(elt, 'error');
        });
      }
      setSucess(false);
      form.reset();
    } catch (err) {
      notify("La requête s'est mal excécuté", 'error');
      console.log(err);
    }
    setVisible(false);
  };

  // handle file upload
  const handleFileUpload = (files: FileWithPath[]) => {
    setSucess(true);
    notify('Le fichier a bien été importé', 'sucess');
    setFile(files[0]);
  };

  const notify = (subject: any, type: string) => (type === 'sucess' ? toast.success(subject) : toast.error(subject));
  return (
    <div>
      <LoadingOverlay visible={visible} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'orange' }} />

      <form action="" onSubmit={form.onSubmit((values) => uploadFile(values))} onReset={form.onReset}>
        <Select
          className="my-7"
          label="Origine du fichier"
          placeholder="Choisir"
          size="md"
          defaultValue={'BASE_SITES'}
          withAsterisk
          data={upload_data}
          {...form.getInputProps('origine')}

        />

        <Group align="center">
          <MonthPickerInput
            type="multiple"
            clearable
            required
            label="Choisir un date ou un intervalle de mois"
            placeholder="choisir un mois ou un intervalle de mois"
            mx="auto"
            locale="fr"
            size={'md'}
            className="w-full py-7"
            {...form.getInputProps('date_range')}
          />
        </Group>
        <div>
          <Dropzone
            onDrop={(files) => {
              handleFileUpload(files);
            }}
            onReject={() => notify('extension valide : xls, xlsx, csv \n taille maximum: 5Mo', 'error')}
            maxSize={3 * 1024 ** 2}
            accept={[MIME_TYPES.xls, MIME_TYPES.csv, MIME_TYPES.xlsx]}
            {...props}
          >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <img src={Excell} className="w-12" alt="" />

              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Faites glisser les fichiers excell ou csv ici ou cliquez pour sélectionner les fichiers
                </Text>
              </div>
            </Group>
          </Dropzone>



          <div className={`${!sucess && 'hidden'}`}>
            <div className={`p-5 flex justify-center items-center gap-4`}>
              <img src={Excell} className="w-12" alt="" />
              <p className="font-bold text-green underline">{file?.name}</p>
              <Tooltip label="Annuler l'importation du fichier">
                <UnstyledButton className="hover:bg-red-600 rounded-full" onClick={() => setSucess(false)}>
                  <IconX size={50} stroke={3.5} color={theme.colors.red[6]} />
                </UnstyledButton>
              </Tooltip>
            </div>
            <div className={`flex justify-center items-center gap-6`}>
              {/* <Tooltip label="Importer le fichier">
                        <UnstyledButton className='hover:bg-green-600 rounded-full' onClick={uploadFile}>
                            <IconCheck
                                size={50}
                                stroke={3.5}
                                color={theme.colors.green[6]}
                            />
                        </UnstyledButton>
                    </Tooltip> */}
            </div>
          </div>
        </div>
        <div className="my-7 text-center">
          <Button
            type="submit"
            disabled={!sucess}
            variant="outline"
            color="orange"
            size="xl"
            rightSection={<img className="w-10" src={Send2} alt="" />}
          >
            Charger
          </Button>
        </div>
      </form>
    </div>
  );
}
