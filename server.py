from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
app = Flask(__name__)

restaurant_objects = {
    1: {
        "id": "1",
        "name": "Vegan Grill (UES)",
        "stars": 4,
        "pic": "https://i.ibb.co/QHmgtXX/vegan-grill.jpg",
        "hours": {
            "Mon": "09:00-21:00",
            "Tue": "09:00-21:00",
            "Wed": "09:00-21:00",
            "Thu": "09:00-21:00",
            "Fri": "08:00-00:00",
            "Sat": "08:00-00:00",
            "Sun": "08:00-22:00"
        },
        "phone": "(917) 675-7381",
        "location": "Upper East Side",
        "address": "Vegan Grill Avenue 1726 2nd Avenue New York, NY 10128",
        "about": "Vegan Grill NYC is a fully vegan establishment. We offer a wide selection of dishes using only the highest quality ingredients. Whether you are vegan, plant based, gluten free or simply curious we have delicious options for you! We are excited to serve our vegan and plant based community!",
        "dishes": [
            "Breakfast Burrito", "Chia Bowls", "Tofu Scramble"
        ],
        "additional_locations": [9]
    },
    2: {
        "id": "2",
        "name": "Spicy Moon (WV)",
        "stars": 4,
        "pic": "https://i.ibb.co/tJdmxkQ/vegan-grill.png",
        "hours": {
            "Sun": "11:30-23:00",
            "Mon": "11:30-23:00",
            "Tue": "11:30-23:00",
            "Wed": "11:30-23:00",
            "Thu": "11:30-23:00",
            "Fri": "11:30-00:00",
            "Sat": "11:30-00:00"
        },
        "phone": "(646) 429-8471",
        "location": "West Village",
        "address": "68 W 3rd St, New York, NY 10012",
        "about": "This cozy eatery boasts eclectic decor and offers a delightful array of plant-based Chinese and Szechuan dishes. Situated in a relaxed setting, it's the perfect spot to enjoy flavorful cuisine with friends or family. From traditional favorites to innovative creations, there's something for every palate here. Come experience the fusion of comfort and culinary excellence at this charming establishment.",
        "dishes": ["Dan Dan Noodle", "Mapo Tofu", "Vegetable Lo Mein"],
        "additional_locations": [10]
    },
    3: {
        "id": "3",
        "name": "Bodhi Kosher",
        "stars": 4,
        "pic": "https://i.ibb.co/rt9p57Q/Screenshot-2024-02-27-at-4-02-20-PM.png",
        "hours": {
            "Mon": "11:00-21:45",
            "Tue": "11:00-21:45",
            "Wed": "11:00-21:45",
            "Thu": "11:00-21:45",
            "Fri": "11:00-21:45",
            "Sat": "11:00-21:45",
            "Sun": "11:00-21:45"
        },
        "phone": "(646) 590-1390",
        "location": "East Village",
        "address": "77 Mulberry St, New York, NY 10013",
        "about": "We are a Chinese-Cantonese style vegetarian Restaurant, specializing in Dim Sum and classic Chinese dishes. We want to show everyone that vegetarian and vegan Chinese cuisine can be just as, if not more, delicious. At Bodi Kosher, our dedication to Chinese-Cantonese vegetarian cuisine shines through in every dish, from our delectable Dim Sum to our timeless Chinese favorites.",
        "dishes": ["BBQ Vegetable Meat", "Eggplant in Garlic Sauce", "Ma Po Tofu"]
    },
    4: {
        "id": "4",
        "name": "Tamam",
        "stars": 4,
        "pic": "https://i.ibb.co/CJ6cBBB/tamam.png",
        "hours": {
            "Mon": "10:00-20:00",
            "Tue": "10:00-20:00",
            "Wed": "10:00-20:00",
            "Thu": "10:00-21:00",
            "Fri": "10:00-21:00",
            "Sat": "11:00-20:00",
            "Sun": "11:00-19:00"
        },
        "phone": "(212) 639-1818",
        "location": "Upper East Side",
        "address": "1108 Lexington Ave, New York, NY 10075",
        "about": "Tamam is a New York City-based fast-casual Israeli Mediterranean plant-based eatery. We source the freshest products, using organic and fair trade ingredients. We pride ourselves in preparing everything in our kitchen, and cooking all food to order. Our goal is to become a NYC institution that serves tasty, plant-based, accessible food for all, because we believe eating healthy is the best way to show yourself love.",
        "dishes": ["Falafel", "Shawarma (Cauliflower)", "Salad Bowl"]
    },
    5: {
        "id": "5",
        "name": "Beyond Sushi",
        "stars": 5,
        "pic": "https://i.ibb.co/vvD6kwG/beyond-sushi.png",
        "hours": {
            "Sun": "11:30-21:30",
            "Mon": "11:30-21:30",
            "Tue": "11:30-21:30",
            "Wed": "11:30-21:30",
            "Thu": "11:30-21:30",
            "Fri": "11:30-22:30",
            "Sat": "11:30-22:30"
        },
        "phone": "(212) 564-0869",
        "location": "Midtown",
        "address": "134 W 37th Street, New York, NY 10018",
        "about": "Beyond Sushi is a chef-driven, vegan and kosher restaurant chain at the forefront of the plant-based movement. Our fundamentals are simple: Eat clean and leave a lasting impact on our planet.Since 2012, we’ve served our community with innovative dishes and a memorable dining experience. Our Midtown flagship is a full-service restaurant seating 90 guests with sophisticated dinner specials, crafted cocktails, group dining menus, and private buyouts for events. For those looking for a quick and healthy bite, takeout and delivery is available at both of our restaurants.",
        "dishes": ["Shiitake Truffle", "Oshizushi Spicy 'Salmon'", "Nutty Buddy Wrap"]
    },
    6: {
        "id": "6",
        "name": "Beatnic",
        "stars": 4,
        "pic": "https://i.ibb.co/RgGpwC8/beatnic.png",
        "hours": {
            "Sun": "11:00-22:00",
            "Mon": "11:00-22:00"
        },
        "phone": "(212) 290-8000",
        "location": "Soho",
        "address": "240 Lafayette Street, New York, NY 10012",
        "about": "To find our truth, we went back to our roots: NYC’s Greenwich Village and its OG free-spirited, you-be-you culture. At Beatnic, we strive to unite people and taste buds around amazing vegan food that makes you want to sing, dance, and order seconds. Our journey led us to create a vibrant culinary experience where every bite tells a story of creativity, passion, and the eclectic spirit of Greenwich Village.",
        "dishes": ["Quinoa Taco Salad", "Guac 'Burger'", "Fable Chili Burrito"]
    },
    7: {
        "id": "7",
        "name": "Peacefood",
        "stars": 5,
        "pic": "https://i.ibb.co/3mZ2qkX/peacefood.png",
        "hours": {
            "Mon": "11:30-21:30",
            "Tue": "11:30-21:30",
            "Wed": "11:30-21:30",
            "Thu": "11:30-22:00",
            "Fri": "11:30-22:00",
            "Sat": "11:30-22:00",
            "Sun": "11:30-21:30"
        },
        "phone": "(212) 979-2288",
        "location": "Union Square",
        "address": "41 East 11th Street, New York, NY 10003",
        "about": "Peacefood is a casual plant-based restaurant with two locations, one in Greenwich Village and the other in the Upper West Side, NYC. We’re known for home-style global vegan cuisine with gluten-free options and an artistic decor. Our menu offers a variety of dishes for lunch, dinner, coffee, smoothies, and a full line of vegan desserts at a great value. Our delicious food, friendly welcoming vibe, and service make for a very happy dining experience, inviting guests to savor every moment with us.",
        "dishes": ["Minestrone Soup", "Gluten Free Biscuits", "Pan Seared Shanghai Dumplings"]
    },
    8: {
        "id": "8",
        "name": "Goodsugar",
        "stars": 5,
        "pic": "https://i.ibb.co/bKbbKNs/goodsugar.png",
        "hours": {
            "Mon": "07:30-19:00",
            "Tue": "07:30-19:00",
            "Wed": "07:30-19:00",
            "Thu": "07:30-19:00",
            "Fri": "07:30-19:00",
            "Sat": "08:00-17:00",
            "Sun": "08:00-17:00"
        },
        "phone": "(718) 306-3906",
        "location": "Upper East Side",
        "address": "1186 3rd Ave, New York, NY 10021",
        "about": "Fruit and vegetables are our primary source of calories. plants provide us with needed carbohydrates, clean protein, lean fat, vitamins, minerals, and compounds like antioxidants. We are not meant to be ravenous meat eaters. We do not need as much protein as  everyone believes. Plus, plants are just delicious. We offer fresh juice, unrefined ingredients, super fresh, pretty, colorful, organic, kosher, plant based, & plastic free delicacies.",
        "dishes": ["Superfood Smoothies", "Egyptian Red Lentil Soup", "Crispy Cauliflower Wings"]
    },
    9: {
        "id": "9",
        "name": "Vegan Grill (EV)",
        "stars": 4,
        "pic": "https://i.ibb.co/QHmgtXX/vegan-grill.jpg",
        "hours": {
            "Mon": "09:00-21:00",
            "Tue": "09:00-21:00",
            "Wed": "09:00-21:00",
            "Thu": "09:00-21:00",
            "Fri": "08:00-00:00",
            "Sat": "08:00-00:00",
            "Sun": "08:00-22:00"
        },
        "phone": "(917) 261-4446",
        "location": "East Village",
        "address": "Vegan Grill St. Marks Place, 58 Saint Marks Place, New York, NY 10003",
        "about": "Vegan Grill NYC is a fully vegan establishment. We offer a wide selection of dishes using only the highest quality ingredients. Whether you are vegan, plant based, gluten free or simply curious we have delicious options for you! We are excited to serve our vegan and plant based community!",
        "dishes": ["Breakfast Burrito", "Chia Bowls", "French Toast", "Tofu Scramble", "Pancakes"],
        "additional_locations": [1]
    },
    10: {
        "id": "10",
        "name": "Spicy Moon (EV)",
        "stars": 4,
        "pic": "https://i.ibb.co/tJdmxkQ/vegan-grill.png",
        "hours": {
            "Mon": "11:30-22:00",
            "Tue": "11:30-22:00",
            "Wed": "11:30-22:00",
            "Thu": "11:30-22:00",
            "Fri": "11:30-22:00",
            "Sat": "11:30-22:00",
            "Sun": "11:30-22:00"
        },
        "phone": "(646) 429-8471",
        "location": "Upper West Side",
        "address": "328 E 6th St, NY, NY 10003",
        "about": "This cozy eatery boasts eclectic decor and offers a delightful array of plant-based Chinese and Szechuan dishes. Situated in a relaxed setting, it's the perfect spot to enjoy flavorful cuisine with friends or family. From traditional favorites to innovative creations, there's something for every palate here. Come experience the fusion of comfort and culinary excellence at this charming establishment.",
        "dishes": ["Dan Dan Noodle", "Mapo Tofu", "Vegetable Lo Mein"],
        "additional_locations": [2]
    }
}


# ROUTES


@app.route('/')
def welcome():
    return render_template('welcome.html', data=restaurant_objects)



@app.route('/view/<int:id>')
def view_restaurant(id):
    print(id)
    # Retrieve restaurant details based on the provided ID
    #print(restaurant_objects.get(id))
    restaurant = restaurant_objects.get(id)
    #print(restaurant) 
    if restaurant:
        return render_template('view.html', restaurant=restaurant,restaurant_objects=restaurant_objects)
    else:
        return "Restaurant not found"

@app.route('/get_all_items')
def get_all_items():
    all_items = list(restaurant_objects.values())
    return jsonify({"data": all_items})




@app.route('/search', methods=['POST', 'GET'])
def search():
    if request.method == 'POST':
        search_term = request.form.get('term')
    else:
        search_term = request.args.get('location')  # Get the location query parameter
        
    if not search_term.strip():
        return jsonify({'search_text': '', 'results': [], 'count': 0, 'message': 'No results found'})

    search_results = []
    for key, restaurant in restaurant_objects.items():
        if (search_term.lower() in restaurant['name'].lower() or 
            search_term.lower() in restaurant['location'].lower() or 
            any(search_term.lower() in dish.lower() for dish in restaurant['dishes'])):
               search_results.append({
                'id': restaurant['id'], 
                'name': restaurant['name'],
                'location': restaurant['location'],  # Add location to search results
                'dishes': ', '.join(restaurant['dishes'])  # Convert list of dishes to comma-separated string
            })
            # search_results.append({'id': restaurant['id'], 'name': restaurant['name']})
    
    search_results.sort(key=lambda x: x['name'].lower())  # Sort them alphabetically 

    return jsonify({'search_text': search_term, 'results': search_results})




@app.route('/results')
def results():
    # Get the search term and results from the query parameters
    term = request.args.get('term')
    results_json = request.args.get('results')
    

    # Parse the results JSON string
    results = json.loads(results_json) if results_json else []
    
    # Render the results page with the search term and results
    return render_template('results.html', term=term, results=results)


@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_restaurant(id):
        # Assuming restaurant_objects is a dictionary containing restaurant objects
        print(" the id:"+ str(id))
        
        restaurant = restaurant_objects.get(id)
        
        if not restaurant:
            return "Restaurant not found", 404
        
        if request.method == 'POST':
            # Get data from the JSON payload
            data = request.json
            print("Received data:", data) 
            
            # Extract fields from the JSON data
            name = data.get('name')
            stars = data.get('stars')
            location = data.get('location')
            hours = data.get('hours')
            phone = data.get('phone')
            address = data.get('address')
            about = data.get('about')
            dishes = data.get('dishes')
            #additional_locations = data.get('additional_locations')

            # Update the restaurant object with the edited values
            restaurant['name'] = name
            restaurant['stars'] = int(stars)
            restaurant['location'] = location
            restaurant['hours'] = hours
            restaurant['phone'] = phone
            restaurant['address'] = address
            restaurant['about'] = about
            restaurant['dishes'] = dishes
            #restaurant['additional_locations'] = additional_locations
            
            # Print the ID of the updated restaurant
            print("ID inside edit:", restaurant['id'])

            # Return a JSON response indicating success with the ID of the updated restaurant
            return jsonify({'message': 'Restaurant edited successfully', 'id': id})
        
        # Render the edit template and pass the restaurant object to it
        return render_template('edit.html', restaurant=restaurant)





@app.route('/add', methods=['GET', 'POST'])
def add_or_save_sale():
    if request.method == 'POST':
        # Get data from the JSON payload
        data = request.json
        print("Received data:", data) 
        
        # Extract fields from the JSON data
        name = data.get('name')
        stars = data.get('stars')
        pic = data.get('pic')
        hours = data.get('hours')
        phone = data.get('phone')
        location = data.get('location')
        address = data.get('address')
        about = data.get('about')
        dishes = data.get('dishes')
        #additional_locations = data.get('additional_locations')

        # Create a new restaurant object
        new_id = str(len(restaurant_objects) + 1)
        restaurant = {
            'id': new_id,
            'name': name,
            'stars': int(stars),
            'pic': pic,
            'hours': hours,
            'phone': phone,
            'location': location,
            'address': address,
            'about': about,
            'dishes': dishes
        }
        
        # Convert additional locations to a list of integers
        #additional_locations = list(map(int, additional_locations))
        #restaurant['additional_locations'] = additional_locations
        
        # Add the new restaurant object to the restaurant_objects dictionary
        restaurant_objects[int(new_id)] = restaurant

        # Print the ID of the newly added restaurant
        print("ID inside add:", restaurant['id'])

        # Return a JSON response indicating success with the ID of the new restaurant
        return jsonify({'message': 'Restaurant added successfully', 'id': new_id})

    return render_template('add.html')




    









if __name__ == '__main__':
   app.run(debug = True)




