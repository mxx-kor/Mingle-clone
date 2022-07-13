import React, { useEffect, useState } from 'react'
import { useResultContext } from '../contexts/ResultContextProvider';
import { links } from './Links';
import { Link } from 'react-router-dom';

const { kakao } = window;


export const Maps = () => {
  const { searchTerm } = useResultContext()
  const [InputText, setInputText] = useState(searchTerm);
  const [place, setPlace] = useState(searchTerm);
  const [placeList, setplaceList] = useState([]);

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
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
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
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

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div className="text-2xl p-4">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
  }, [place])

  return (
    <>
      <div className='flex'>
        <div className='w-1/4 h-screen'>
          <form className="inputForm" onSubmit={handleSubmit}>
            <input className='dark:bg-gray-200 border shadow-sm outline-none p-2 text-black hover:shadow-lg' placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
            <button type="submit">검색</button>
          </form>
          <div id="result-list" className='h-5/6 overflow-y-auto text-black bg-white'>
            {placeList.map((item, i) => (
              <div key={i}>
                <span>{i + 1}</span>
                <div>
                  <h5>{item.place_name}</h5>
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
          <div id="pagination"></div>
        </div>
        <div className='w-3/4 relative'>
          <div id="myMap" className='h-screen text-black'>
            <div className='absolute z-10'>
              {links.slice(0,-1).map(({ url, text }, i) => (
                <Link key={i} to={url}>{text}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
