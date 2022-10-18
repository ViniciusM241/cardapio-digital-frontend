import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getItemById from '../../services/getItemById';
import updateItem from '../../services/updateItem';
import createItem from '../../services/createItem';
import getExtras from '../../services/getExtras';
import getCategories from '../../services/getCategories';
import { toast } from 'react-toastify';
import itemSchema from '~/utils/validations/itemSchema';
import useBreakpoints from '~/hooks/useBreakpoints';
import client from '~/boot/client';

import { StyledMdKeyboardArrowLeft, StyledImg, StyledEditIcon } from './styles';

import {
  Container,
  Inline,
  Col,
  T1,
  Form,
  Input,
  Line,
  CheckBox,
  TextArea,
  Select,
  EmptyImage,
} from '~/components';
import SaveButton from '../../components/SaveButton';
import { currency } from '~/utils/masks';

function ItemDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const breakpoints = useBreakpoints();
  const id = location.pathname.replace(/^(\D)+/, '');

  const [item, setItem] = useState({});
  const [extras, setExtras] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const _getItemById = async (id) => {
    const item = await getItemById(id);

    setItem(item);
    setImageURL(item.imageURL);
  };

  const _getExtras = async () => {
    const extras = await getExtras();

    setExtras(extras);
  };

  const _getCategories = async () => {
    const categories = await getCategories();

    setCategories(categories);
  };

  const handleSubmit = async ({ values }) => {
    setIsLoading(true);
    let res;
    const newValues = { ...values, imageURL };

    if (id) {
      res = await updateItem(id, newValues);
    } else {
      res = await createItem(newValues);
    }
    setIsLoading(false);

    if (res.status === 204 || res.status === 201) {
      toast.success('Dados salvos com sucesso');
      navigate('/administrativo/cardapio/');
    } else {
      toast.error('Erro ao salvar');
    }
  };

  const handleFileUpload = () => {
    const input = document.getElementById('uploadImage');
    input.click();
  };

  const handleUpload = (e) => {
    const inputFile = e.target;
    const files = inputFile.files;

    if (files.length) {
      const data = new FormData();
      const file = files[0];

      setImageURL(URL.createObjectURL(file));
      data.append('file', file, file.name);

      client.post('/static', data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          console.log(progress);
        }
      })
        .then(res => {
          setImageURL(client.defaults.baseURL + res?.data?.file?.url);
        })
        .catch(() => {
          setImageURL(null);
          toast.error('Erro ao tentar fazer upload de imagem');
        });
    }
  };

  useEffect(() => {
    if (id) {
      _getItemById(id);
    }
  }, [id]);

  useEffect(() => {
    _getExtras();
    _getCategories();
  }, []);

  return (
    <Container>
      <Inline>
        <Col cols={1} xs={3}>
          <StyledMdKeyboardArrowLeft onClick={() => navigate(`/administrativo/cardapio`)} />
        </Col>
        <Col cols={11} xs={9}>
          <T1>{id ? 'Editar' : 'Adicionar'} item</T1>
        </Col>
      </Inline>
      <Col cols={2} xs={12}>
        <Inline className="mt-40 mb-20" center={breakpoints.xs}>
          {
            !imageURL ?
              <EmptyImage onClick={handleFileUpload} width={180} height={180} icoSize={4} style={{ position: 'relative' }}>
                <StyledEditIcon/>
              </EmptyImage>
            :
              <StyledImg onClick={handleFileUpload} src={imageURL} style={{ position: 'relative' }}>
                <StyledEditIcon/>
              </StyledImg>
          }
        </Inline>
      </Col>
      <Form
        initialValues={{
          name: item.name || '',
          description: item.description || '',
          value: item.value ? currency(item.value) : '',
          categoryId: item.categoryId || '',
          extraItems: item.extras ? item.extras.map(x => x.id) : [],
        }}
        onSubmit={handleSubmit}
        validationSchema={itemSchema}
      >
        <Input
          type="text"
          name="name"
          placeholder="Digite o nome..."
          label="Nome"
        />
        <TextArea
          type="text"
          name="description"
          placeholder="Digite a descrição..."
          label="Descrição"
          className="mt-10"
        />
        <Input
          type="text"
          name="value"
          placeholder="Digite o valor..."
          label="Valor"
          className="mt-10"
          onChange={(e) => {
            const masked = currency(e);

            return masked;
          }}
        />
        <Select
          type="select"
          name="categoryId"
          className="mt-10"
          items={categories}
        />
        <T1 className="mt-10" style={{ fontWeight: '400' }}>Adicionais</T1>
        <Line className="mt-10" />
        <>
          {
            extras.map(extra => (
              <CheckBox
                className="mt-10"
                type="checkbox"
                name="extraItems"
                key={extra.id}
                label={extra.name}
                value={extra.id}
              />
            ))
          }
        </>
        <SaveButton type="submit" disabled={isLoading} />
      </Form>
      <input
        type="file"
        id="uploadImage"
        accept="image/jpeg,image/png,image/pjpeg,image/gif"
        name="files"
        style={{display: 'none'}}
        onChange={handleUpload}
    />
    </Container>
  );
}

export default ItemDetails;
