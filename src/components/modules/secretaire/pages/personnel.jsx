import React from 'react';
import { BeatLoader } from 'react-spinners';
import { PersonnelCard } from '../components/personnelCard';
import { SecretaireBaseLayout } from '../components/secretaireBaseLayout';
import '../css/personnel.css';
import {
  getCaissiere,
  getInfirmiere,
  getLaborantin,
  getMedecin,
  getSecretaire,
  getStagiaire,
} from '../network/secretaire.network';

export class Personnel extends React.Component {
  state = {
    isLoading: true,
    personnelToShow: [],
    active: 1,

    allPersonnel: [],
    medecins: [],
    secretaires: [],
    caissiers: [],
    infirmiers: [],
    laborantins: [],
    stagiaires: [],
  };

  async componentDidMount() {
    await this.fetchMedecin();
    await this.fetchCaissiere();
    await this.fetchSecretaire();
    await this.fetchInfirmier();
    await this.fetchLaborantin();
    await this.fetchStagiaire();
    this.fetchAllPersonnel();
  }

  fetchMedecin = async () => {
    await getMedecin()
      .then((data) => {
        this.setState({
          medecins: data?.result,
        });
      })
      .catch((e) => console.log(e));
  };

  fetchSecretaire = async () => {
    await getSecretaire()
      .then((data) => {
        this.setState({
          secretaires: data?.result,
        });
      })
      .catch((e) => console.log(e));
  };

  fetchCaissiere = async () => {
    await getCaissiere()
      .then((data) => {
        this.setState({
          caissiers: data?.result,
        });
      })
      .catch((e) => console.log(e));
  };

  fetchInfirmier = async () => {
    await getInfirmiere()
      .then((data) => {
        this.setState({
          infirmiers: data?.result,
        });
      })
      .catch((e) => console.log(e));
  };

  fetchLaborantin = async () => {
    await getLaborantin()
      .then((data) => {
        this.setState({
          laborantins: data?.result,
        });
      })
      .catch((e) => console.log(e));
  };

  fetchStagiaire = async () => {
    await getStagiaire()
      .then((data) => {
        this.setState({
          stagiaires: data?.result,
        });
      })
      .catch((e) => console.log(e));
  };

  fetchAllPersonnel = () => {
    let all = [];
    all = all
      .concat(this.state.medecins)
      .concat(this.state.caissiers)
      .concat(this.state.secretaires)
      .concat(this.state.infirmiers)
      .concat(this.state.laborantins)
      .concat(this.state.stagiaires);
    this.setState({
      allPersonnel: all,
      personnelToShow: all,
      isLoading: false,
    });
  };

  updateContent = (index) => {
    this.setState({
      active: index,
    });

    if (index === 1) {
      this.setState({ personnelToShow: this.state.allPersonnel });
    } else if (index === 2) {
      this.setState({ personnelToShow: this.state.medecins });
    } else if (index === 3) {
      this.setState({ personnelToShow: this.state.secretaires });
    } else if (index === 4) {
      this.setState({ personnelToShow: this.state.caissiers });
    } else if (index === 5) {
      this.setState({ personnelToShow: this.state.infirmiers });
    } else if (index === 6) {
      this.setState({ personnelToShow: this.state.laborantins });
    } else if (index === 7) {
      this.setState({ personnelToShow: this.state.stagiaires });
    }
  };

  render() {
    return (
      <SecretaireBaseLayout clicked={'personnel'}>
        <div>
          <div className='row bar'>
            <p
              className={this.state.active === 1 ? 'active' : 'non-active'}
              onClick={() => this.updateContent(1)}
            >
              Tout
            </p>
            <p
              className={this.state.active === 2 ? 'active' : 'non-active'}
              onClick={() => this.updateContent(2)}
            >
              Médecins
            </p>
            <p
              className={this.state.active === 3 ? 'active' : 'non-active'}
              onClick={() => this.updateContent(3)}
            >
              Secrétaire
            </p>
            <p
              className={this.state.active === 4 ? 'active' : 'non-active'}
              onClick={() => this.updateContent(4)}
            >
              Caissiers
            </p>
            <p
              className={this.state.active === 5 ? 'active' : 'non-active'}
              onClick={() => this.updateContent(5)}
            >
              Infirmiers
            </p>
            <p
              className={this.state.active === 6 ? 'active' : 'non-active'}
              onClick={() => this.updateContent(6)}
            >
              Laborantins
            </p>
            <p
              className={this.state.active === 7 ? 'active' : 'non-active'}
              onClick={() => this.updateContent(7)}
            >
              Stagiaires
            </p>
          </div>

          {this.state.isLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
              }}
            >
              <BeatLoader
                loading={this.state.isLoading}
                size={50}
                color='#417ef7'
              />
            </div>
          ) : (
            <div className='row'>
              {this.state.personnelToShow.map((item, index) => {
                return <PersonnelCard personnel={item} key={index} />;
              })}
            </div>
          )}
        </div>
      </SecretaireBaseLayout>
    );
  }
}
