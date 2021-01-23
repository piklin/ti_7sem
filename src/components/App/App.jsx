import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addFligth, getFligths } from '../../models/AppModel';
import { addFligthAction, downloadFligthsAction } from '../../store/actions';
import Fligth from '../Fligth/Fligth';
import './App.css';

class App extends PureComponent {
  onFligthAdd = async () => {
    let fligthName = prompt('Введите время рейса', '');
    let re = /(([0-1][0-9])|(2[0-3])):[0-5][0-9]/;

    if (!fligthName || !fligthName.trim() || !re.test(fligthName)) {
      alert('Время введено неверно!');
      return;
    }
    fligthName = fligthName.trim();

    let fligthDest = prompt('Введите пункт назначения', '').trim();
    if (!fligthDest || !fligthDest.trim()) {
      alert('Пункт назначения введена неверно!');
      return;
    }
    fligthDest = fligthDest.trim();

    let fligthPalace = prompt('Введите количество мест', '').trim();
    if (!fligthPalace || !fligthPalace.trim() || !parseInt(fligthPalace)) {
      alert('Количество мест введено неверно!');
      return;
    }
    fligthPalace = fligthPalace.trim();

    const newFligthData = {
          fligthName: fligthName,
          fligthDest: fligthDest,
          fligthPalace: fligthPalace,
          clients: []
    };

    const info = await addFligth(newFligthData);
    console.log(info);

    this.props.addFligthDispatch(newFligthData);
    };

  async componentDidMount() {
    const fligths = await getFligths();
    this.props.downloadFligthsDispatch(fligths);
  }

  render() {
    const { fligths } = this.props;

    return (
      <>
        <header className="main-header">
          <div className="main-title">
            Авиарейсы
          </div>
          <div className="main-image"></div>
        </header>
        <main className="main-container">
          {fligths
            .sort(function (a, b) {
              if (a.fligthName > b.fligthName) {
                return 1;
              }
              if (a.fligthName < b.fligthName) {
                return -1;
              }
              return 0;
            })
            .map((fligth, index) => (
            <Fligth
              fligthName={fligth.fligthName}
              fligthDest={fligth.fligthDest}
              fligthPalace={fligth.fligthPalace}
              fligthId={index}
              clients={fligth.clients}
              key={`fligth${index}`}
            />
          ))}
          <div className="fligth">
              <header className="fligth-add" onClick={this.onFligthAdd}>
                Добавить рейс
              </header>
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = ({ fligths }) => ({ fligths });

const mapDispatchToProps = (dispatch) => ({
  addFligthDispatch: (data) => dispatch(addFligthAction(data)),
  downloadFligthsDispatch: (fligths) =>
    dispatch(downloadFligthsAction(fligths)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
