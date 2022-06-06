
export const review = {
    "review_id": 5,
    "rating": 3,
    "summary": "I'm enjoying wearing these shades",
    "recommend": false,
    "response": null,
    "body": "Comfortable and practical.",
    "date": "2019-04-14T00:00:00.000Z",
    "reviewer_name": "shortandsweeet",
    "helpfulness": 5,
    "photos": [{
        "id": 1,
        "url": "urlplaceholder/review_5_photo_number_1.jpg"
      },
      {
        "id": 2,
        "url": "urlplaceholder/review_5_photo_number_2.jpg"
      },
      // ...
    ]
  };

  const meta = {
    
        "product_id": "2",
        "ratings": {
          2: 1,
          3: 1,
          4: 2,
          // ...
        },
        "recommended": {
          0: 5
          // ...
        },
        "characteristics": {
          "Size": {
            "id": 14,
            "value": "4.0000"
          },
          "Width": {
            "id": 15,
            "value": "3.5000"
          },
          "Comfort": {
            "id": 16,
            "value": "4.0000"
          },
          // ...
      }
  }

// id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
// 1,1,5,1596080481467,"This product was great!","I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",true,false,"funtime","first.last@gmail.com",null,8
// 2,1,4,1610178433963,"This product was ok!","I really did not like this product solely because I am tiny and do not fit into it.",false,false,"mymainstreammother","first.last@gmail.com",null,2
// 3,2,4,1609325851021,"I am liking these glasses","They are very dark.  But that's good because I'm in very sunny spots",true,false,"bigbrotherbenjamin","first.last@gmail.com","Glad you're enjoying the product!",5
// 4,2,4,1593628485253,"They look good on me","I so stylish and just my aesthetic.",true,false,"fashionperson","first.last@gmail.com",null,1
// 5,2,3,1615987717620,"I'm enjoying wearing these shades","Comfortable and practical.",true,false,"shortandsweeet","first.last@gmail.com",null,5
// 6,2,5,1593564521722,"I'm not a fan!","I don't like them",false,false,"negativity","first.last@gmail.com","Sorry to hear. Is there anything in particular you don't like?",0