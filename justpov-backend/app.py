from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

staff_queue = [] 
staff_index = 0

@app.route('/api/staff', methods=['POST'])
def add_staff(): 
    data = request.get_json()
    name = data.get("name")
    if isinstance(name,str) and name.strip() != "": 
        staff_queue.append(name)
        return jsonify({"status": "Staff added"}), 201
    return jsonify({"error": "Invalid staff name"}), 400

@app.route('/api/book', methods=['POST'])
def book_appointment(): 
    global staff_index
    data = request.get_json()
    client = data.get("client")
    service = data.get("service")

    if not isinstance(client, str) or client.strip() == "":
        return jsonify({"error": "Invalid client name"}), 400

    if not isinstance(service, str) or service.strip() == "":
        return jsonify({"error": "Invalid service"}), 400

    if not staff_queue:
        return jsonify({"error": "No staff available"}), 503

    staff_member = staff_queue[staff_index]
    staff_index = (staff_index + 1) % len(staff_queue)

    return jsonify({
        "status": "Appointment booked",
        "staff": staff_member,
        "service": service
    }), 200

    
'''
Notes
# Checks if the staff queue is empty after making sure the client and service are valid strings
#validation first, then processing
if isinstance(client, str) and client.strip() != "" and isinstance(service, str) and service.strip() != "":
    if staff_queue:
        staff_member = staff_queue[staff_index]
        staff_index = (staff_index + 1) % len(staff_queue)
        return jsonify({"status": "Appointment booked", "staff": staff_member}), 200
    return jsonify({"error": "No staff available"}), 503

'''
if __name__ == '__main__':
    app.run(debug=True)


