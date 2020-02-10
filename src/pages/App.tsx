import React, { useState, useEffect } from 'react'
import { Menu, Image, Dimmer, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const painters = ['Leonardo Da Vinci', 'Claude Monet', 'Van Gogh', 'William Turner']

const apiKey = "ccfb43d0-49a2-11ea-89db-0d1e2aec8854"

export default function App() {

  const [activeItem, setActiveItem] = useState('Leonardo Da Vinci');
  const [paintings, setPaintings] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(`https://api.harvardartmuseums.org/object?q=${activeItem}&apikey=${apiKey}&hasimage=1&size=20`)
    const data = await response.json()
    setPaintings(data.records)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [activeItem])


  console.log(paintings)
  return (
    <>
      <div style={{ backgroundColor: "#14181c" }}>

        <Menu
          stackable
          style={styles.menu}
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

        <Dimmer active={loading}>
          <Loader size='huge'>Loading</Loader>
        </Dimmer>

        <Image.Group size='medium' style={{ marginLeft: 40 }}>
          {paintings.map((painting: any) => {
            return (<Image src={`${painting.primaryimageurl}?width=300&height=300`} centered />)
          })}
        </Image.Group>
      </div>
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