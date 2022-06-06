import { Image, Space } from 'antd';
// import { Link } from 'react-router-dom';
import imageDossier from '../../../../assets/images/image_dossier.png';
import { DateFrHr } from '../../../shared/DateToFrench';

export const BulletinExamen = ({ posts, loading, info }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Space size={20}>
        <Image src={imageDossier} height={180} width={190} />
        <div>
          {info.map((params) => (
            <>
              <p> nom patient : {params.label} </p>
              <p> type d'examen : {params.type} </p>
              <p> description: {params.description} </p>
            </>
          ))}

          <Space>
            {/* <Button type='primary'>Imprimer le dossier</Button> */}
          </Space>
        </div>
      </Space>
      <Space size={250} style={{ marginTop: 20 }}>
        <div>
          <Space>
            <div>
              {posts.map((post) => (
                <li>
                  <p> date prelevement : {DateFrHr(post.date_prelevement)} </p>
                  <p> type prelevement : {post.type_prelevement} </p>
                  <p> resultat: {post.resultat} </p>
                  <p> conclusion : {post.Conclusion} </p>
                </li>
              ))}
            </div>
            <div></div>
          </Space>
        </div>
        <div></div>
      </Space>
    </div>
  );
};
