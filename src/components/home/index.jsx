import * as React from 'react';
import { Grid,
        Box,
        Typography,
        ListItemText,
        List,
        ListItem,
        Stack,
        Button,
        Stepper,
        Modal,
        FormControlLabel,
        RadioGroup,
        Radio,
        FormControl,
        MenuItem, Step, StepLabel,StepButton,TextField ,Select,InputLabel} from '@mui/material';
import { Container } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from "axios";

const Home = (data) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState('');
  const [firstNameSecond, setFirstNameSecond] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [lastNameSecond, setLastNameSecond] = React.useState('');
  const [identification, setIdentification] = React.useState('');
  const [typeIdentification, setTypeIdentification] = React.useState('');
  const [sede, setSede] = React.useState('');

  const steps = getSteps();
  const listSedes = [
    {
      'sede': 1,
      'direction': 'Calle 1 #79-87'
    },
    {
      'sede': 2,
      'direction': 'Calle 1 #79-87'
    },
    {
      'sede': 3,
      'direction': 'Calle 1 #79-87'
    },
  ];
  const listArray = [
    'Selecciona la oficina mas cercana.',
    'Ingresa tus datos.',
    'Selecciona el servicio.',
    'Verifica tu información.'
  ];
  function getSteps() {
    return ['0', '1', '3','4'];
  }
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    setTypeIdentification(e.target.value);
  }
  const handleChangeRadio = (event) => {
    setSede(event.target.value);
    console.log(sede);
  };
  //repcathca
  const [disableSubmit,setDisableSubmit] = React.useState(true);
  function onChange(value) {
    setDisableSubmit(false);
  }

  //modal 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    const element = document.getElementById("verfication");
    const opt = {
      margin: 1,
      filename: "turno.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };
  const handleClose = () => {
    window.location.replace('');
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    textAlign: 'center',
    pt: 2,
    px: 4,
    pb: 3,
  };

  return(
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'end',
        marginTop: '-50px'
       }}>
         <Box sx={{ 
        display: 'flex',
        justifyContent: 'center'
       }} onClick={handleBack}>
          <KeyboardBackspaceIcon />
          <Typography sx={{ 
              textAlign: "left",
              fontSize: "16px", }} variant="p" component="div">
              atras
            </Typography>
         </Box>
          <Box>
            <Stepper alternativeLabel activeStep={activeStep} sx={{ width: '500px'}}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel></StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
      </Box>
      <div>
      {(() => {
        if (activeStep == 0) {
          return (
            <Grid container spacing={2} sx={{ marginTop: '50px'}}>
                <Grid item xs={5}>
                    <Container sx={{
                    marginTop: '50px',
                    paddingLeft: '50px !important' 
                    }}>
                        <Typography sx={{ 
                        mt: 4, 
                        mb: 2,
                        textAlign: "left",
                        color: "#1F9547",
                        fontSize: "23px",
                        fontWeight: "bold",
                        margin: "0px" }} variant="p" component="div">
                        Solicita tu turno virtual 
                    </Typography>
                    <Typography sx={{ 
                        mt: 4, 
                        mb: 2,
                        textAlign: "left",
                        color: "#1F9547",
                        fontSize: "23px",
                        margin: "0px" }} variant="p" component="div">
                        y realiza todos tus trámites sin filas.
                    </Typography>
                    <Typography sx={{ 
                        mt: 4, 
                        mb: 2,
                        textAlign: "left",
                        color: "#3F3F41",
                        fontSize: "18px",
                        marginBottom: "0px"}} variant="p" component="div">
                        Como solicitar tu turno
                    </Typography>
                        <List >
                        {/* primary={`${i+1} ${value}`} */}
                        {listArray.map((value,i) => (
                            <ListItem>
                            <ListItemText>
                                <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <Stack sx={{    
                                    width: '20px',
                                    background: '#1F9547',
                                    borderRadius: '50%',
                                    height: '20px',
                                    alignItems: 'center'
                                    }}>
                                        <Typography sx={{ 
                                        textAlign: "center",
                                        color: "white",
                                        margin: "0px",
                                        fontSize: '11px',
                                        paddingTop: '2px'
                                        }} variant="p" component="div">
                                        {i+1}
                                        </Typography>
                                    
                                    </Stack>
                                </Grid>
                                <Grid item xs={7}>
                                {value}
                                </Grid>
                                </Grid>
                            </ListItemText> 
                            </ListItem>
                        ))}
                        </List>
                        <Button variant="contained" sx={{
                        color: 'white',
                        background: '#3F3F41',
                        margin: 'auto',
                        textAlign: 'center'
                        }} onClick={handleNext}>Solicitar Turno</Button>

                    </Container>

                </Grid>
                <Grid item xs={7}>
                    <Box
                    component="img"
                    sx={{
                        padding: '10px',
                        textAlign: 'center'
                    }}
                    alt="The house from the offer."
                    src="/img/grupo.svg"
                    />
                </Grid>
            </Grid>
          )
        } else if (activeStep == 2) {
          return (
            <Grid container spacing={2} sx={{ marginTop: '50px'}}>
              <Grid item xs={4}>
                  <Container sx={{
                  marginTop: '50px',
                  paddingLeft: '50px !important' 
                  }}>
                  <Typography sx={{ 
                      mt: 4, 
                      mb: 2,
                      textAlign: "left",
                      color: "#1F9547",
                      fontSize: "23px",
                      fontWeight: "bold",
                      margin: "0px" }} variant="p" component="div">
                      Ingresa tus datos
                  </Typography>
                  {/* onSubmit={handleSubmit} */}
                  <form >
                    <Grid container alignItems="center" justify="center" sx={{
                      marginTop: '20px'
                    }}>
                      <Grid item xs={12}>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="Age"
                          defaultValue={"Cédula de ciudadania"}
                          variant="standard"
                          fullWidth= "true"
                          onChange={handleChange}
                        >
                          <MenuItem value={"Cédula de ciudadania"}>Cédula de ciudadania</MenuItem>
                          <MenuItem value={"Cédula de extranjeriaCédula de extranjeria"}>Cédula de extranjeria</MenuItem>
                          <MenuItem value={"Otros"}>Otros</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Número de documento"
                          variant="standard"
                          required
                          inputProps={{ type: 'number'}}
                          fullWidth= "true"
                          value={identification}
                          onChange={e => setIdentification(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Primer Nombre"
                          variant="standard"
                          required
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Segundo Nombre"
                          variant="standard"
                          required
                          value={firstNameSecond}
                          onChange={e => setFirstNameSecond(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Primer Apellido"
                          variant="standard"
                          required
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Segundo Apellido"
                          variant="standard"
                          required
                          value={lastNameSecond}
                          onChange={e => setLastNameSecond(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Typography sx={{ 
                      textAlign: "left",
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "0px",
                      marginTop: '20px'}} variant="p" component="div">
                      Sede {sede}
                    </Typography>
                    {listSedes.map((value,i) => {
                      if(sede == (i+1)){
                        return(
                          <Typography sx={{ 
                      textAlign: "left",
                      fontSize: "14px",
                      margin: "0px",}} variant="p" component="div">
                        {value.direction} 
                        </Typography>
                        )
                      }
                    
                    })}
                      
                  </form>
                      <Button variant="contained" sx={{
                      color: 'white',
                      background: '#3F3F41',
                      marginTop: '20px',
                      textAlign: 'center'
                      }} 
                      onClick={handleNext}
                      disabled={!identification || !firstNameSecond || !firstName || !lastNameSecond || !lastName}>Siguiente</Button>
                      {/* disabled={!identification || !firstNameSecond || !firstName || !lastNameSecond || !lastName} */}

                  </Container>
              </Grid>
              <Grid item xs={6} sx={{
                      margin: 'auto'
                  }}>
                  <Box
                  component="img"
                  sx={{
                      padding: '10px',
                      textAlign: 'center',
                      margin: 'auto'
                  }}
                  alt="Grupo"
                  src="/img/grupoForm.svg"
                  />
              </Grid>
            </Grid>
          )
        } else if (activeStep == 1) {
          return (
            <Grid container spacing={2} sx={{ marginTop: '50px'}}>
              <Grid item xs={4}>
                  <Container sx={{
                  marginTop: '50px',
                  paddingLeft: '50px !important' 
                  }}>
                  <Typography sx={{ 
                      mt: 4, 
                      mb: 2,
                      textAlign: "left",
                      color: "#1F9547",
                      fontSize: "23px",
                      fontWeight: "bold",
                      margin: "0px" }} variant="p" component="div">
                      Selecciona la oficina mas cercana
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      onChange={handleChangeRadio}
                    >
                    {listSedes.map((value,i) => (
                    <FormControlLabel value={i+1} control={<Radio />} 
                    label={<Typography sx={{ margin:'0px'}} variant="p" component="div">Sede {value.sede}: <h6 style={{margin:'0px',color:'#A5A5A5'}}>{value.direction}</h6></Typography>} >
                    </FormControlLabel>
                    ))}
                  </RadioGroup>
                  
                  </FormControl>
                  
                  </Container>
                  <Box sx={{
                        margin: 'auto',
                        textAlign: 'center',
                        marginTop: '10px',
                        }}>
                  <Button variant="contained" sx={{
                        color: 'white',
                        background: '#3F3F41',
                        margin: 'auto',
                        textAlign: 'center'
                        }} disabled={!sede} onClick={handleNext}>Siguiente</Button>
                  </Box>
                  
              </Grid>
              <Grid item xs={8} sx={{
                  }}>
                  <Box
                  component="img"
                  sx={{
                      textAlign: 'center',
                      margin: 'auto',
                      width: '100%',
                      height: '500px'
                  }}
                  alt="Grupo"
                  src="/img/map.png"
                  />
              </Grid>
            </Grid>
          )
        }else {
          return (
            <Grid id="verfication" container spacing={2} sx={{ marginTop: '50px'}}>
                <Grid item xs={5}>
                    <Container sx={{
                    marginTop: '50px',
                    paddingLeft: '50px !important' 
                    }}>
                        <Typography sx={{ 
                        textAlign: "left",
                        color: "#1F9547",
                        fontSize: "23px",
                        fontWeight: "bold",
                         }} variant="p" component="div">
                        Verifica tu información
                    </Typography>
                    <Typography sx={{ 
                        marginTop: '10px',
                        textAlign: "left",
                        fontSize: "23px",
                        fontWeight: "bold",
                        }} variant="p" component="div">
                        { firstName } { firstNameSecond } { lastName } { lastNameSecond }
                    </Typography>
                    <Typography sx={{ 
                        
                        textAlign: "left",
                        fontSize: "14px",
                        margin: "0px" }} variant="p" component="div">
                        CC { identification }
                    </Typography>

                    <Typography sx={{ 
                        mt: 4, 
                        mb: 2,
                        textAlign: "left",
                        fontSize: "23px",
                        fontWeight: "bold", }} variant="p" component="div">
                        Consulta Externa
                    </Typography>
                    <Typography sx={{ 
                      textAlign: "left",
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "0px",
                      marginTop: '20px'}} variant="p" component="div">
                      Sede {sede}
                    </Typography>
                    {listSedes.map((value,i) => {
                      if(sede == (i+1)){
                        return(
                          <Typography sx={{ 
                      textAlign: "left",
                      fontSize: "14px",
                      margin: "0px",
                      marginBottom: '20px'}} variant="p" component="div">
                        {value.direction} 
                        </Typography>
                        )
                      }
                    
                    })}
                        <div className ="App"> 
                        < ReCAPTCHA 
                          sitekey ="6LfTjAchAAAAAEG6_1jjOD-VYV51uKHKex-e_Zwv"
                          onChange={onChange} 
                        /> 
                      </div> 
                      <Button variant="contained" sx={{
                        color: 'white',
                        background: '#3F3F41',
                        marginTop: '20px',
                        textAlign: 'center'
                        }} 
                        onClick={handleOpen}
                        disabled={disableSubmit}
                        >Aceptar</Button>
                    </Container>
                </Grid>
                <Grid item xs={7}>
                    <Box
                    component="img"
                    sx={{
                        padding: '10px',
                        textAlign: 'center'
                    }}
                    alt="The house from the offer."
                    src="/img/grupo.svg"
                    />
                </Grid>
            </Grid> 
          )
        }
      })()}
        
      </div>
      <Modal
        open={open}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        id="modal"
      >
        <Box sx={{ ...style, width: 300 }}>
          <Box
            component="img"
            sx={{
            padding: '10px',
            textAlign: 'center',
            width: '250px',
            height: 'auto',
            margin: 'auto',
            }}
            alt="logo"
            src="/img/logo.png"
          />
          <Typography sx={{ 
              mt: 4, 
              mb: 2,
              textAlign: "center",
              color: "#1F9547",
              fontSize: "23px",
              fontWeight: "bold", }} variant="h2" component="div">
              ¡Has solicitado tu turno con éxito!
          </Typography>
          <Typography sx={{ 
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
              margin: '0px' }} variant="p" component="div">
              Servicio:
          </Typography>
          <Typography sx={{ 
              textAlign: "center",
              fontSize: "16px" 
              }} variant="span" component="div">
              Consulta Externa
          </Typography>
          
          <Typography sx={{ 
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
            margin: "0px",
            marginTop: '20px'}} variant="p" component="div">
            Sede {sede}
          </Typography>
          {listSedes.map((value,i) => {
            if(sede == (i+1)){
              return(
                <Typography sx={{ 
            textAlign: "center",
            fontSize: "14px",
            margin: "0px",}} variant="p" component="div">
              {value.direction} 
              </Typography>
              )
            }
          
          })}
          <Button onClick={handleClose} variant="outlined" sx={{
            color: "#1F9547",
            border: "1px solid #1F9547",
            marginTop: "10px"
          }}>Solicitar otro turno</Button>
        </Box>
      </Modal>
    </Box>
    
    
  )
};

export default Home;