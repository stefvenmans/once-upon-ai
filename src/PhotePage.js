import React from 'react'


export const PhotePage = (props) => {
  const image_objs = props.image_objs
  let show_images = [false, false, false, false, false]

  const width = 150
  const height = 150

  function alterShowImages(answer) {
    for (let i = 0; i < image_objs.length; i++) {
      if (keyword in answer) {
        show_images[i] = true
      }
    }
  }

  return (<div>
    {show_images[0] && <img src={require('./images/'+ image_objs[0] +'.jpg')} width={width} height={height} alt="image not found"/>}
    {show_images[0] && <img src={require('./images/'+ image_objs[1] +'.jpg')} width={width} height={height} alt="image not found"/>}
    {show_images[0] && <img src={require('./images/'+ image_objs[2] +'.jpg')} width={width} height={height} alt="image not found"/>}
    {show_images[0] && <img src={require('./images/'+ image_objs[3] +'.jpg')} width={width} height={height} alt="image not found"/>}
    {show_images[0] && <img src={require('./images/'+ image_objs[4] +'.jpg')} width={width} height={height} alt="image not found"/>}
  </div>)
}
