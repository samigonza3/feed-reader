import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import MIT from '../Scraping/mit_results';  

const ContenedorConTarjetas = () => {
  return (
    <Container style={{ marginTop: '40px', marginLeft: '200px', width: `calc(100% - 240px)` }}>
      <Grid container spacing={2}>
        {MIT.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                alt={`Imagen ${index + 1}`}
                height="140"
                image={item.image}
              />
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Button variant="contained" color="primary" href={item.link} target="_blank" rel="noopener noreferrer">
                  Ver más
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContenedorConTarjetas;
