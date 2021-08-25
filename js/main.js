let options = {
    "jsonQuery": {
        "foot_min": {
            "type": "range",
            "value": {
                "lte": 15
            }
        },
        "_type": "flatsale",
        "room": {
            "type": "terms",
            "value": [
                2,
                3
            ]
        },
        "building_status": {
            "type": "term",
            "value": 2
        },
        "floor": {
            "type": "range",
            "value": {
                "gte": 3
            }
        },
        "total_area": {
            "type": "range",
            "value": {
                "gte": 58
            }
        },
        "price": {
            "type": "range",
            "value": {
                "lte": 7300000
            }
        },
        "only_foot": {
            "type": "term",
            "value": "2"
        },
        "engine_version": {
            "type": "term",
            "value": 2
        },
        "currency": {
            "type": "term",
            "value": 2
        },
        "only_flat": {
            "type": "term",
            "value": true
        },
        "from_developer": {
            "type": "term",
            "value": true
        },
        "region": {
            "type": "terms",
            "value": [
                4593
            ]
        },
        "kitchen": {
            "type": "range",
            "value": {
                "gte": 9
            }
        }
    }
};

const url = 'https://api.cian.ru/search-offers/v2/search-offers-desktop/';


async function cian() {
    fetch(url, {  
        method: 'post',  
        headers: {
        'Content-Type': 'text/plain;charset=UTF-8' 
        },  
        body: JSON.stringify(options)
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  }
  
  cian();