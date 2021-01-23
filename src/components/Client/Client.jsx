import { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  editClient as editClientServer,
  removeClient as removeClientServer,
} from '../../models/AppModel';
import {
  editClientAction,
  removeClientAction,
} from '../../store/actions';

class Client extends PureComponent {

  onRemove = async () => {
    const ok = window.confirm('Удалить пассажира?');
    if (!ok) {
      return;
    }

    const removeData = {
      clientId: this.props.clientId,
      fligthId: this.props.fligthId,
    };
    await removeClientServer(removeData);
    this.props.removeClientDispatch(removeData);
  };

  onClientEdit = async () => {
    let newClientName = prompt('Введите новоe ФИО пассажира');
    if (!newClientName || !newClientName.trim()) {
      alert('Неверный формат ФИО пассажира');
      return;
    }

    newClientName = newClientName.trim();

    const updatedData = {
      clientId: this.props.clientId,
      clientName: newClientName,
      fligthId: this.props.fligthId
    };

    await editClientServer(updatedData);

    this.props.editClientDispatch(updatedData);
  };

  render() {
    const { clientId, fligthId } = this.props;
    const client = this.props.fligths[fligthId].clients[clientId];

    return (
      <div className="client-container">
        <div className="client">
          <div className="client-name">{client.name}</div>
          <div className="icon-container">
            <div className="edit" onClick={this.onClientEdit}></div>
            <div className="delete" onClick={this.onRemove}></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ fligths }) => ({ fligths });

const mapDispatchToProps = (dispatch) => ({
  editClientDispatch: ({ clientId, fligthId, clientName }) =>
    dispatch(editClientAction({ clientId, fligthId, clientName })),
  removeClientDispatch: ({ clientId, fligthId }) =>
    dispatch(removeClientAction({ clientId, fligthId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
