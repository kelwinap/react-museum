import React, { useState, useEffect } from 'react'
import { Menu, Image, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const painters = ['Da vinci', 'Monet', 'Van Gogh', 'Turner']

const apiKey = "ccfb43d0-49a2-11ea-89db-0d1e2aec8854"

export default function App() {

  const [activeItem, setActiveItem] = useState('Da vinci');
  const [paintings, setPaintings] = useState([])

  const fetchData = async () => {
    const response = await fetch(`https://api.harvardartmuseums.org/object?q=${activeItem}&apikey=${apiKey}`)
    const data = await response.json()

    setPaintings(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [activeItem])




  return (
    <>
      <Grid>
        <Grid.Column width={6}></Grid.Column>
        <Menu size='massive'
          fixed="left"
          style={styles.menu}
          vertical
        >
          {painters.map((painter, index) => (
            <Menu.Item
              style={{ ...styles.menuItem }}
              name={painter}
              color={"orange"}
              active={activeItem === painter}
              onClick={() => setActiveItem(painter)}
            />
          ))}
        </Menu>

        <Grid.Column width={5}>
          <Image src={"https://ids.lib.harvard.edu/ids/view/47174896?width=3000&height=3000"} size="huge" />
        </Grid.Column>
        <Grid.Column width={5}>
          <Image src={"https://ids.lib.harvard.edu/ids/view/47174896?width=3000&height=3000"} size="large" />
        </Grid.Column>
      </Grid>
    </>

  )
}

const styles = {
  menu: {
    background: 'black',
    textAlign: 'center'
  },
  menuItem: {
    color: 'white',
    fontSize: 35,
    height: 50
  }
}