import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { MedecinBaseLayout } from '../components/medecinBaseLayout';
import {
  getCurrentSingleBulletinExamen,
  getSingleInfoSomebody,
} from '../network/medecin.network';
import { BulletinExamen } from './BulletinExamen';
import Pagination from './Pagination';

export const BulletinResultat = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  //const [consultation] = useState(location?.state?.consultation);
  const [singleExam, setSingleExam] = useState([]);
  const [informationOfSomeBody, setSingleInformation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);

  console.log(
    'la location xxl ',
    location.state.consultation,
    location.state.consultation.id,
  );

  useEffect(() => {
    setIsLoading(true);

    // getCurrentSingleExamenCovid(
    //   location.state.consultation.consultation,
    //   location.state.consultation.id,
    // ).then((data) => {
    //   console.log(location.state.consultation);
    //   if (data) {
    //     console.log(data);
    //     setSingleExam(data?.result);
    //     setIsLoading(false);
    //   } else {
    //     console.log(data);
    //   }
    // });

    // getSingleInfoSomebody(location.state.consultation.id).then((data) => {
    //   console.log(location.state.consultation);
    //   if (data) {
    //     console.log('informationghgfgfgfggffgsfasfkjljl', data);
    //     setSingleInformation(data?.result);
    //     setIsLoading(false);
    //     console.log('setSingleInformation', data);
    //   } else {
    //     console.log('setSingleInformation error', data);
    //   }
    // });

    const syncExecute = async () => {
      await getCurrentSingleBulletinExamen(
        location.state.consultation.consultation,
        location.state.consultation.id,
      ).then((data) => {
        console.log(location.state.consultation);
        if (data) {
          console.log('4654654654654654654654', data);
          setSingleExam(data?.result);
          setIsLoading(false);
        } else {
          console.log(data);
        }
      });

      await getSingleInfoSomebody(location.state.consultation.id).then(
        (data) => {
          console.log(location.state.consultation);
          if (data) {
            console.log('informationghgfgfgfggffgsfasfkjljl', data);
            setSingleInformation(data?.result);
            setIsLoading(false);
            console.log('setSingleInformation', data);
          } else {
            console.log('setSingleInformation error', data);
          }
        },
      );
    };
    syncExecute().then(() => setIsLoading(false));
    // eslint-disable-next-line
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = singleExam.slice(indexOfFirstPost, indexOfLastPost);

  // const currentPatient = informationOfSomeBody.slice(
  //   indexOfFirstPost,
  //   indexOfLastPost,
  // );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <MedecinBaseLayout clicked={'patient'}>
        <Card title='Bulletin Examen'>
          {/* <img src={logo} alt='fgdfgsdfgsdfg' /> */}

          <div className='container mt-5'>
            <h1 className='text-primary mb-3'> Bulletin d'examen</h1>

            <BulletinExamen
              posts={currentPosts}
              loading={isLoading}
              info={informationOfSomeBody}
            />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={singleExam.length}
              paginate={paginate}
            />

            <a href='fgfg'> imprimer</a>
            <a href='m'> retour </a>
          </div>
        </Card>
      </MedecinBaseLayout>
    </>
  );
};

export const action = (cell, row) => {};
