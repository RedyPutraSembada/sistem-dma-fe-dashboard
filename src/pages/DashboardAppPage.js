import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { cekUserLogin } from '../utils/cekUserLogin';
// components
// import Iconify from '../components/iconify';
// sections
import {
  // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppCurrentVisits,
  AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  // AppCurrentSubject,
  // AppConversionRates,
} from '../sections/@dashboard/app';
import { getProducts } from '../app/api/product';
import { getAllProduct } from '../app/features/product/actions';
import { userLogin } from '../app/features/auth/actions';
import { getAllBarangMasuk } from '../app/api/barangMasuk';
import { getUsers } from '../app/api/user';
import { getAllUsers } from '../app/features/user/actions';
// import { element } from 'prop-types';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();
  const { dataProducts, dataUsers } = useSelector(state => state);
  const dispatch = useDispatch()
  const user = cekUserLogin();
  const navigate = useNavigate();
  const [barangMasuks, setBarangMasuks] = useState([]);
  const [tglData, setTgldata] = useState([]);
  const [kelProduct, setKelProduct] = useState([]);
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
    const userl = userLogin(user);
    dispatch(userl);
    getProduct();
    getBarangMasuk();
    users();
  }, []);

  const users = async () => {
    const response = await getUsers();
    const users = getAllUsers(response.data.data);
    dispatch(users);
  }

  useEffect(() => {
    aksiPisahDataBarangMasuk(barangMasuks);
  }, [barangMasuks])

  const getProduct = async () => {
    const response = await getProducts();
    const products = getAllProduct(response.data.data);
    dispatch(products);
  }

  const getBarangMasuk = async () => {
    const response = await getAllBarangMasuk();
    setBarangMasuks(response.data.data);
  }

  const aksiPisahDataBarangMasuk = (barangMasuks) => {
    const arr = [];
    const kelompokProduct = [];
    // barangMasuks.findIndex(el => el.tgl_masuk === arr.)
    barangMasuks.forEach(element => {
      arr.push(element.tgl_masuk);
    });

    // const arrIndex = arr.findIndex(el => el  )

    const tglUniq = [...new Set(arr)];
    setTgldata(tglUniq);
    // console.log(dataProducts.data);
    dataProducts.data.forEach(element => {
      kelompokProduct.push({
        name: element.name,
        _id: element._id,
        type: 'area',
        fill: 'gradient',
        data: []
      })
    });

    // console.log(barangMasuks);
    kelompokProduct.forEach(element => {
      barangMasuks.forEach(el => {
        if (element._id === el.product._id) {
          element.data.push(el.qty_masuk)
        }
      })
    });
    setKelProduct(kelompokProduct);

    let panjang = 0;
    kelompokProduct.forEach(element => {

      if (panjang < element.data.length) {
        panjang = element.data.length;
        console.log(element.data);
      }
      if (panjang > element.data.length) {
        let el = [];
        for (let index = 1; index < panjang; index += 1) {
          el.push(0)
          // console.log(element);
        }
        console.log(element.data);
        console.log(el);
        const ts = [].concat(el, element.data);
        element.data = ts;
        console.log(ts);
        // element.data.push(ts);
        el = []
      }

    })
  }

  // const aksiHapusDuplicate


  return (
    <>
      <Helmet>
        <title> DMA </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Products" total={dataProducts.data.length} icon={'ant-design:shop-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Users" total={dataUsers.data.length} color="info" icon={'ant-design:user-outlined'} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Diagram Rata-Rata"
              subheader="Perhitungan dari barang Masuk"
              chartLabels={tglData}
              chartData={kelProduct}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
