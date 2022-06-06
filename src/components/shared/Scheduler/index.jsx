/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { L10n } from '@syncfusion/ej2-base';
import {
  Agenda,
  Day,
  DragAndDrop,
  Inject,
  Month,
  Resize,
  ScheduleComponent,
  Week,
} from '@syncfusion/ej2-react-schedule';
import { Button, Space, Tooltip } from 'antd';
import { useState } from 'react';
import { FaMapMarkerAlt, FaSave } from 'react-icons/fa';

L10n.load({
  'en-US': {
    schedule: {
      saveButton: 'Enregistrer',
      cancelButton: 'Annuler',
      deleteButton: "Supprimer l'évènement",
      newEvent: 'Add Event',
    },
  },
});

export const Scheduler = ({ dataSource, allowModif, height, onSubmit }) => {
  const [newEvent, setNewEvent] = useState([]);
  const [updateEvent, setUpdateEvent] = useState([]);
  const [deleteEvent, setDeleteEvent] = useState([]);

  const getTime = (date) => {
    let hr = date.getHours();
    let min = date.getMinutes() + '';
    if (min.length === 1) {
      min = min + '0';
    }
    return `${hr}:${min}`;
  };

  //style appointment in scheduler
  const eventTemplate = (props) => {
    return (
      <div
        className='template-wrap'
        style={{
          backgroundColor: props.Color,
          height: 1000,
          width: '100%',
          minWidth: 1000,
        }}
      >
        <div style={{ fontStyle: 'Montserrat' }}>{props.Subject}</div>
        <div>
          Heure : {getTime(props.StartTime)} - {getTime(props.EndTime)}
        </div>
        <Space
          size={2}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FaMapMarkerAlt size={10} /> {props.Location}
        </Space>
      </div>
    );
  };

  // const editorWindowTemplate = (props) => {
  //   return (
  //     <div>
  //       <p>Modife component</p>
  //     </div>
  //   );
  // };

  return (
    <div>
      {allowModif && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}
        >
          <Tooltip title='Terminer et enregistrer'>
            <Button
              size='large'
              type='primary'
              onClick={() => {
                console.log(newEvent);
                console.log(updateEvent);
                console.log(deleteEvent);
                onSubmit?.(newEvent);
              }}
            >
              <FaSave style={{ marginRight: 10 }} />
              Enregistrer
            </Button>
          </Tooltip>
        </div>
      )}

      <ScheduleComponent
        width='100%'
        height={height || '600px'}
        selectedDate={new Date()}
        //cellClick={(value) => console.log({ value })}
        actionComplete={({ addedRecords, changedRecords, deletedRecords }) => {
          if (addedRecords?.length > 0) {
            const { Id, EndTime, StartTime, Subject, Location, Description } =
              addedRecords[0];
            let listEvents = newEvent;
            listEvents.push({
              id: Id,
              sujet: Subject,
              heure_debut: StartTime,
              heure_fin: EndTime,
              description: Description,
              localisation: Location,
            });
            setNewEvent(listEvents);
          } else if (changedRecords?.length > 0) {
            const { Id, EndTime, StartTime, Subject, Location, Description } =
              changedRecords[0];
            let listEvents = updateEvent;
            let obj = {
              id: Id,
              sujet: Subject,
              heure_debut: StartTime,
              heure_fin: EndTime,
              description: Description,
              localisation: Location,
            };
            setNewEvent(
              newEvent.map((event) => {
                if (event?.id === obj.id) {
                  return { ...obj };
                }
                return event;
              }),
            );
            listEvents.push(obj);
            setUpdateEvent(listEvents);
          } else if (deletedRecords?.length > 0) {
            const { Id, EndTime, StartTime, Subject, Location, Description } =
              deletedRecords[0];
            let listEvents = deleteEvent;
            let obj = {
              id: Id,
              sujet: Subject,
              heure_debut: StartTime,
              heure_fin: EndTime,
              description: Description,
              localisation: Location,
            };
            setNewEvent(
              newEvent.map((event) => {
                if (event?.id === obj.id) {
                  return null;
                }
                return event;
              }),
            );
            listEvents.push(obj);
            setDeleteEvent(listEvents);
          }
        }}
        eventSettings={{
          dataSource,

          allowAdding: allowModif,
          allowEditing: allowModif,
          allowDeleting: allowModif,

          fields: {
            id: 'Id',
            subject: {
              name: 'Subject',
              title: 'Evènement',
              validation: { required: true },
            },
            location: {
              name: 'Location',
              title: 'Localisation',
              validation: { required: true },
            },
            description: { name: 'Description', title: 'Description' },
            startTime: {
              name: 'StartTime',
              title: 'Heure de début',
              validation: { required: true },
            },
            endTime: {
              name: 'EndTime',
              title: 'Heure de fin',
              validation: { required: true },
            },
          },
          template: eventTemplate,
        }}
        //editorTemplate={editorWindowTemplate}
        allowDragAndDrop={true}
        allowResizing={true}
      >
        <Inject services={[Day, Week, Month, Agenda, DragAndDrop, Resize]} />
      </ScheduleComponent>
    </div>
  );
};
