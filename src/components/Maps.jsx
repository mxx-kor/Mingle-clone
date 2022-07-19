import React, { useEffect, useState } from 'react'
import { useResultContext } from '../contexts/ResultContextProvider';
import { links } from './Links';
import { Link } from 'react-router-dom';

const { kakao } = window;


export const Maps = () => {
  const { searchTerm, setSearchTerm } = useResultContext()
  const [InputText, setInputText] = useState(searchTerm);
  const [place, setPlace] = useState(searchTerm);
  const [placeList, setplaceList] = useState([]);
  const [toggle, setToggle] = useState(true);

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(InputText === "") {
      alert('검색어를 입력해주세요')
    } else {
      setPlace(InputText)
      setSearchTerm(InputText)
    }
  }

  const onToggle = () => {
    setToggle((previous) => !previous)
  }

  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(place, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
        displayPagination(pagination)
        setplaceList(data)
      }
    }

    function displayPagination(pagination) {
      let paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),i

      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        let el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i
        el.className = "text-xl dark:bg-gray-900 dark:text-gray-200 bg-white border rounded-lg px-2 mr-4"

        if (i === pagination.current) {
          el.className = 'on text-xl dark:bg-gray-400 dark:text-gray-200 bg-gray-200 border rounded-lg px-2 mr-4'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div>'+ place.address_name.slice(0,2) + ' ' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
  }, [place])

  return (
    <>
      {toggle ? 
        <div className='translate-x-0 duration-500 absolute flex z-10'>
          <div className='w-[500px] dark:bg-gray-900 bg-gray-100 h-screen'>
            <form className="inputForm" onSubmit={handleSubmit}>
              <input 
                className='dark:bg-gray-200 w-11/12 border shadow-sm outline-none p-2 text-black hover:shadow-lg' 
                placeholder="검색어를 입력하세요" 
                onChange={onChange} 
                value={InputText} 
              />
              <button className='w-10 dark:bg-gray-900 justify-center items-center' type="submit">검색</button>
            </form>
            <div id="result-list" className='h-[85%] overflow-y-auto dark:bg-gray-900 dark:text-gray-200 bg-white border'>
              {placeList.map((item, i) => (
                <div 
                  className='cursor-pointer hover:outline outline-1 rounded-lg my-3 py-2' 
                  onClick={() => {
                    setInputText(item.place_name);
                    setPlace(item.place_name);
                  }} 
                  key={i}
                  >
                  <div>
                    <span>{i + 1}. {item.place_name}</span>
                    {item.road_address_name ? (
                      <div>
                        <span>{item.road_address_name}</span>
                        <span>{item.address_name}</span>
                      </div>
                    ) : (
                      <span>{item.address_name}</span>
                    )}
                    <span>{item.phone}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex dark:bg-gray-900 w-full justify-center items-center mt-4' id="pagination"></div>
          </div>
          <div className='h-screen z-10'>
            <div className='mt-2'>
              {links.slice(0,-1).map(({ url, text }, i) => (
                <Link className='text-sm text-black border rounded-full px-2 py-1 mr-1 hover:shadow-lg' key={i} to={url}>{text}</Link>
              ))}
            </div>
            <div className='absolute top-2/4 text-xl'>
              <button className='dark:text-gray-200 dark:bg-gray-900 bg-white opacity-90 px-2 py-1 rounded-xl hover:bg-gray-300' onClick={onToggle}>{toggle ? "<" : ">"}</button>
            </div>
          </div>
        </div> 
        : 
        <div className='-translate-x-[500px] duration-500 absolute flex z-10'>
          <div className='w-[500px] dark:bg-gray-900 bg-gray-100 h-screen'>
            <form className="inputForm" onSubmit={handleSubmit}>
              <input 
                className='dark:bg-gray-200 w-11/12 border shadow-sm outline-none p-2 text-black hover:shadow-lg' 
                placeholder="검색어를 입력하세요" 
                onChange={onChange} 
                value={InputText} 
              />
              <button className='w-10 dark:bg-gray-900 justify-center items-center' type="submit">검색</button>
            </form>
            <div id="result-list" className='h-[85%] overflow-y-auto dark:bg-gray-900 dark:text-gray-200 bg-white border'>
              {placeList.map((item, i) => (
                <div 
                  className='cursor-pointer hover:outline outline-1 rounded-lg my-3 py-2' 
                  onClick={() => {
                    setInputText(item.place_name);
                    setPlace(item.place_name);
                  }} 
                  key={i}
                  >
                  <div>
                    <span>{i + 1}. {item.place_name}</span>
                    {item.road_address_name ? (
                      <div>
                        <span>{item.road_address_name}</span>
                        <span>{item.address_name}</span>
                      </div>
                    ) : (
                      <span>{item.address_name}</span>
                    )}
                    <span>{item.phone}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex dark:bg-gray-900 w-full justify-center items-center mt-4' id="pagination"></div>
          </div>
          <div className='h-screen z-10'>
            <div className='mt-2'>
              {links.slice(0,-1).map(({ url, text }, i) => (
                <Link className='text-sm text-black border rounded-full px-2 py-1 mr-1 hover:shadow-lg' key={i} to={url}>{text}</Link>
              ))}
            </div>
            <div className='absolute top-2/4 text-xl'>
              <button className='dark:text-gray-200 dark:bg-gray-900 bg-white opacity-90 px-2 py-1 rounded-xl hover:bg-gray-300' onClick={onToggle}>{toggle ? "<" : ">"}</button>
            </div>
          </div>
        </div>
      }
      <div className='lg:w-full relative'>
        <div id="myMap" className='h-screen'></div>
      </div>
    </>
  )
}
