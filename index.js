
var reservations = null;
const BASE_URL = "https://pure-brushlands-19781.herokuapp.com/"

var createReservation = function (first_name, last_name, phone, email, day, time) {
    var data = "first_name=" + encodeURIComponent(first_name);
    data += "&last_name=" + encodeURIComponent(last_name);
    data += "&phone=" + encodeURIComponent(phone);
    data += "&email=" + encodeURIComponent(email);
    data += "&day=" + encodeURIComponent(day);
    data += "&time=" + encodeURIComponent(time);
    console.log('data: ', data);
    
    
    fetch(BASE_URL + "reservations", {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function (response) {
        if (response.status == 401) {
            document.getElementById("new-reservation-container").style.display = "none";
            document.getElementById("view-reservation-container").style.display = "none";
            document.getElementById("member-verification-container").style.display = "block";
            var message = document.querySelector("#verification-message");
            message.innerHTML = "NOT LOGGED IN";
            return;
        }
        console.log("reservation saved");
        clearForm();
    });
};

var theButton = document.querySelector("#customer-button");
console.log("the button is: ", theButton);

theButton.onclick = function () {
    var firstName = document.getElementById("first_name").value;
    var lastName = document.getElementById("last_name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var day = document.getElementById("day").value;
    var time = document.getElementById("time").value;

    createReservation(firstName, lastName, phone, email, day, time);

};

var deleteCustomer = function (id) {
    fetch(BASE_URL + "reservations/${id}", {
      method: "DELETE",
      credentials: 'include'
    }).then(function (response) {
        if (response.status == 401) {
            document.getElementById("view-reservation-container").style.display = "none";
            document.getElementById("member-verification-container").style.display = "block";
            var message = document.querySelector("#verification-message");
            message.innerHTML = "NOT LOGGED IN";
            return;
        }
      console.log("customer deleted:", id);
      getCustomers();
    });
};

var updateCustomer = function (id, first_name, last_name, phone, email, day, time) {
    var data = "id=" + encodeURIComponent(id);
    data += "&first_name=" + encodeURIComponent(first_name);
    data += "&last_name=" + encodeURIComponent(last_name);
    data += "&phone=" + encodeURIComponent(phone);
    data += "&email=" + encodeURIComponent(email);
    data += "&day=" + encodeURIComponent(day);
    data += "&time=" + encodeURIComponent(time);
    console.log('updatedata: ', data);

    fetch(BASE_URL + "reservations/${id}", {
        method: "PUT",
        body: data,
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        if (response.status == 401) {
            document.getElementById("view-reservation-container").style.display = "none";
            document.getElementById("member-verification-container").style.display = "block";
            var message = document.querySelector("#verification-message");
            message.innerHTML = "NOT LOGGED IN";
            return;
        }
        console.log("Customer updated:", data);
        clearUpdateForm();
        getCustomers();
    });
};

var retrieveCustomer = function(id) {

    fetch(BASE_URL + "reservations/${id}", {
        method: "GET",
        credentials: "include"
    }).then(function(response) {
        if (response.status == 401) {

            //where is this used?
            document.getElementById("view-reservation-container").style.display = "none";
            document.getElementById("member-verification-container").style.display = "block";
            var message = document.querySelector("#verification-message");
            message.innerHTML = "NOT LOGGED IN";
            return;
        }
        response.json().then(function (data) {
            customer = data;
            console.log('c: ', customer);

            var custId = document.querySelector("#update_id");
            custId.value = customer.id;
            var firstName = document.querySelector("#update_first_name");
            firstName.value = customer.first_name; 
            var lastName = document.querySelector("#update_last_name");
            lastName.value = customer.last_name
            var phone = document.querySelector("#update_phone");
            phone.value = customer.phone;
            var email = document.querySelector("#update_email");
            email.value = customer.email;
            var day = document.querySelector("#update_day");
            day.value = customer.address
            var time = document.querySelector("#update_time");
            time.value = customer.city;
        });
        console.log("customer retrieved:", id);
    });
};

var createMember = function (fname, lname, email_address, password) {
    var data = "fname=" + encodeURIComponent(fname);
    data += "&lname=" + encodeURIComponent(lname);
    data += "&email_address=" + encodeURIComponent(email_address);
    data += "&password=" + encodeURIComponent(password);
    console.log('data: ', data);
    
    
    fetch(BASE_URL + "members", {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function (response) {
        if (response.status == 422) {
            document.getElementById("member-container").style.display = "none";
            document.getElementById("go-to-reservations-container").style.display = "none";
            document.getElementById("member-verification-container").style.display = "block";
            var message = document.querySelector("#verification-message");
            message.innerHTML = "ALREADY REGISTERED. PLEASE SIGN IN";
            return;
        }
        console.log("member saved");
        clearMemberForm();
        var message = document.querySelector("#verification-message");
            message.innerHTML = "REGISTERED. PLEASE SIGN IN";
    });
};

var memberButton = document.querySelector("#member-button");
console.log("member button is: ", theButton);

memberButton.onclick = function () {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email_address").value;
    var password = document.getElementById("password").value;

    createMember(fname, lname, email, password);

    document.getElementById("member-container").style.display = "none";
    document.getElementById("member-verification-container").style.display = "block";
    document.getElementById("already-registered-container").style.display = "none";
};

var createSession = function (email_address, password) {
    var data = "email_address=" + encodeURIComponent(email_address);
    data += "&password=" + encodeURIComponent(password);
    console.log('data: ', data);
    
    
    fetch(BASE_URL + "sessions", {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function (response) {
        if (response.status == 201) {
            console.log("member authenticated");
            clearMemberForm();
            document.getElementById("member-container").style.display = "none";
            document.getElementById("member-verification-container").style.display = "none";
            document.getElementById("new-reservation-container").style.display = "block";
            document.getElementById("view-reservation-container").style.display = "block";
        } else if (response.status == 422) {
            console.log("authentication failed.");
            //document.getElementById("member-verification-container").style.display = "none";
            document.getElementById("already-registered-container").style.display = "none";
            document.getElementById("not-registered-container").style.display = "block";
            document.getElementById("go-to-reservations-container").style.display = "none";
            var message = document.querySelector("#verification-message");
            message.innerHTML = "INCORRECT PASSWORD. PLEASE TRY AGAIN";
        } else {
            console.log("authentication failed.");
            document.getElementById("member-verification-container").style.display = "none";
            document.getElementById("member-container").style.display = "block";
            document.getElementById("not-registered-container").style.display = "none";
            document.getElementById("go-to-reservations-container").style.display = "none";
            var message = document.querySelector("#register-message");
            message.innerHTML = "NOT REGISTERED. PLEASE SIGN UP";
        }
    });
};


verificationButton = document.querySelector("#member-verification-button");
console.log("verification button is: ", verificationButton);

verificationButton.onclick = function () {
    var email_address = document.querySelector("#member-email").value;
    var password = document.querySelector("#member-password").value;

    createSession(email_address, password);
}

var retrieveMember = function(id) {

    fetch(BASE_URL + "members/${id}", {
        method: "GET",
        credentials: 'include'
    }).then(function(response) {
        response.json().then(function (data) {
            member = data;
            console.log('m: ', member);

            var memberId = document.querySelector("#member-id");
            memberId.value = member.id;
            var email = document.querySelector("#member-email");
            email.value = member.email_address;
            var password = document.querySelector("#member-email");
            password.value = member.password
        });
        console.log("member retrieved:", id);
    });
};

var getCustomers = function() {
    fetch(BASE_URL + "reservations", {
        credentials: 'include'
    }).then(function (response) {
        if (response.status == 401) {
            document.getElementById("view-reservation-container").style.display = "none";
            document.getElementById("member-verification-container").style.display = "block";
            var message = document.querySelector("#verification-message");
            message.innerHTML = "NOT LOGGED IN";
            return;
        }

        response.json().then(function (data) {
            // hide reg/auth forms
            // show the vvvv


            customers = data;
            console.log('getCustomers: ', customers);

            var customerList = document.querySelector("#customers");
            customerList.innerHTML = "";

            data.forEach(function (customer) {
                var newItem = document.createElement("li");

                var customerDiv = document.createElement("div");
                customerDiv.innerHTML = 'Name: ' + customer.first_name + ' ' + customer.last_name + '<br>' +
                'Day: ' + customer.day + ' ' + 'Time: ' + customer.time + '<br>';
                customerDiv.className = "customer-info";
                newItem.appendChild(customerDiv);
                console.log('customer: ', customer);

                var deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = function () {
                    var proceed = confirm(`Do you want to delete ${customer.first_name}?`);
                    if (proceed) {
                        deleteCustomer(customer.id);
                    };
                    console.log('customer deleted: ', customer);
                };

                var updateButton = document.createElement("button");
                updateButton.className = "update-button";
                updateButton.innerHTML = "Update";
                updateButton.onclick = function () {
                    retrieveCustomer(customer.id);

                    document.getElementById("edit-reservation-container").style.display = "block";
                    document.getElementById("view-reservation-container").style.display = "none";
                };
                customerDiv.appendChild(deleteButton);
                customerDiv.appendChild(updateButton);

                customerList.appendChild(newItem);
            });
            console.log('customer list: ', customerList);
        });
    });
};
var getReservationsButton = document.querySelector("#reservation");
console.log("the get reservations button is:", getReservationsButton);

getReservationsButton.onclick = function() {
    getCustomers();
    document.getElementById("new-reservation-container").style.display = "none";
}

//BUTTONS
var sendUpdateButton = document.querySelector("#update-customer-button");
console.log("the send update button is: ", sendUpdateButton);

sendUpdateButton.onclick = function () {
    var id = document.getElementById("update_id").value;
    var firstName = document.getElementById("update_first_name").value;
    var lastName = document.getElementById("update_last_name").value;
    var phone = document.getElementById("update_phone").value;
    var email = document.getElementById("update_email").value;
    var day = document.getElementById("update_day").value;
    var time = document.getElementById("update_time").value;

    updateCustomer(id, firstName, lastName, phone, email, day, time);
    console.log('updateCustomer:', id, firstName);

    document.getElementById("edit-reservation-container").style.display = "none";
    document.getElementById("view-reservation-container").style.display = "none";
    document.getElementById("go-to-reservations-container").style.display = "block";
};


var goToReservationsButton = document.querySelector("#go-to-reservations-button");
console.log("not registered button is", goToReservationsButton);

goToReservationsButton.onclick = function() {
    document.getElementById("new-reservation-container").style.display = "block";
    document.getElementById("view-reservation-container").style.display = "block";
    document.getElementById("not-registered-container").style.display = "none";
    document.getElementById("already-registered-container").style.display = "none";
    document.getElementById("go-to-reservations-container").style.display = "none";
}

var alreadyRegisteredButton = document.querySelector("#already-registered-button");
console.log("already registered button is", alreadyRegisteredButton);

alreadyRegisteredButton.onclick = function() {
    document.getElementById("member-verification-container").style.display = "block";
    document.getElementById("member-container").style.display = "none";
    document.getElementById("already-registered-container").style.display = "none";
    document.getElementById("not-registered-container").style.display = "none";
    document.getElementById("go-to-reservations-container").style.display = "none";
}

var notRegisteredButton = document.querySelector("#not-registered-button");
console.log("not registered button is", notRegisteredButton);

notRegisteredButton.onclick = function() {
    document.getElementById("member-container").style.display = "block";
    document.getElementById("not-registered-container").style.display = "none";
    document.getElementById("already-registered-container").style.display = "none";
    document.getElementById("go-to-reservations-container").style.display = "none";
}

function clearForm() {
    var frm = document.getElementById("customer-form").reset();
};
function clearUpdateForm() {
    var frm = document.getElementById("update-customer-form").reset()
};

function clearMemberForm() {
    var frm = document.getElementById("member-form").reset()
}
