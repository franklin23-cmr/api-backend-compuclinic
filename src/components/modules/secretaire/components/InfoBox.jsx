export const InfoBox = ({ title, subTitle }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 80,
        borderRadius: 10,
        paddingTop: 10,
        backgroundColor: 'white',
      }}
      className='box-shadow'
    >
      {title}
      <p style={{ fontFamily: 'Montserrat', fontSize: 24, margin: 0 }}>
        {subTitle}
      </p>
    </div>
  );
};
