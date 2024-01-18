import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import data from '../Scraping/funelio_results';  

const ContenedorConTarjetas = () => {
  return (
    <Container style={{ marginTop: '40px', marginLeft: '200px', width: `calc(100% - 240px)` }}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
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
                <Button variant="contained" color="primary" href={item.url} target="_blank" rel="noopener noreferrer">
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
