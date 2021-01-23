import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addClient as addClientServer } from '../../models/AppModel';
import { addClientAction } from '../../store/actions';
import Client from '../Client/Client';

class Fligth extends PureComponent {
  onClientAdd = async () => {
    let clientName = prompt('Введите фамилию и инициалы пассажира', '');
    if (!clientName || !clientName.trim()) {
      alert('ФИО введены неверно!');
      return;
    }
    clientName = clientName.trim();

    const newClientData = {
      client: {
        name: clientName,
      },
      fligthId: this.props.fligthId,
    };

    await addClientServer(newClientData);

    this.props.addClientDispatch(newClientData);
  };

  render() {
    const fligthId = this.props.fligthId;
    const fligth = this.props.fligths[fligthId];
    let isShow = (fligth.fligthPalace - fligth.clients.length)?true:'';

    return (
      <div className="fligth">
        <div className="fligth-header">
        <header className="fligth-name">{fligth.fligthName}
        <div className="fligth-dop">Пункт назначения: {fligth.fligthDest}</div>
        <div className="fligth-dop">Количество свободных мест: {fligth.fligthPalace - fligth.clients.length}</div>
        </header>
        </div>
          {fligth.clients.map((client, index) => (
            <Client
              clientId={index}
              clientName={client.name}
              clientReason={client.reason}
              fligthId={fligthId}
              key={`fligth${fligthId}-client${index}`}
            />
          ))}
          {isShow && (
        <footer className="add-client-button " onClick={this.onClientAdd}>
          Забронировать место
        </footer>)}
      </div>
    );
  }
}

const mapStateToProps = ({ fligths }) => ({ fligths });

const mapDispatchToProps = (dispatch) => ({
  addClientDispatch: (data) => dispatch(addClientAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Fligth);
