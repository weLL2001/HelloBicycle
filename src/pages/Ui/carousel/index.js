import { Carousel, Card } from 'antd'
import React from 'react'

const ICarousel = () => {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  }
  const onChange = currentSlide => {
  }

  return (
    <Card className="card-wrap">
      <Carousel afterChange={onChange} autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </Card>
  )
}

export default ICarousel