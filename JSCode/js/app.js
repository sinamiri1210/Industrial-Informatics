    var socket = io();
    var pallet_id = '';

    var startData = new Date();
    var startTime = startData.getTime(startData);
    var changedDate;
    var changedTime;

    var palletIDlist = [];

    var addedpallet = false;
    var hasExist;
    var i;


    socket.on('palletData', function (msg) {

        hasExist = false;
        // to decide whether the pallet has been added or not
        for ( i=0; i < palletIDlist.length; i++){
           if (palletIDlist[i] == msg.palletID){
               // if the new pallet exists, then set hasExist True
               hasExist = true;
           }
        }


            // if the new pallet is not added, then add a new pallet
            if (!hasExist) {
                pallet_id = msg.palletID;

                // add a new palllet
                add_pallet1();

                console.log('add pallet');
                addedpallet = true;

                palletIDlist.push(msg.palletID);

                // display the palletID on page
                $('#palletID').append($('<li>').text(pallet_id));

                // display the total number of added pallets
                document.getElementById("palletNumber").innerHTML = palletIDlist.length;
                // update the running time after every second
                setInterval(function (){
                    changedDate = new Date();
                    changedTime = changedDate.getTime(changedDate);

                    var difference = changedTime - startTime;


                    //var daysDifference = Math.floor(difference/1000/60/60/24);
                    //difference -= daysDifference*1000*60*60*24;

                    var hoursDifference = Math.floor(difference/1000/60/60);
                    difference -= hoursDifference*1000*60*60;

                    var minutesDifference = Math.floor(difference/1000/60);
                    difference -= minutesDifference*1000*60;

                    var secondsDifference = Math.floor(difference/1000);

                    //time = new Date(changedTime - startTime);

                    display = hoursDifference+':'+minutesDifference+':'+secondsDifference;
                    // calculate the running time
                    //display = (time.getHours()-2)+':'+time.getMinutes()+':'+time.getSeconds();
                    document.getElementById("time").innerHTML = display;
                }, 1000);

            }
        //}


//
        if (msg.location == 'Z2_Changed') {
            move_pallet12();
        } else if (msg.location == 'Z3_Changed') {
            move_pallet23();
        } else if (msg.location == 'Z4_Changed') {
            move_pallet14();
        } else if (msg.location == 'Z5_Changed') {
            move_pallet35();
            move_pallet45();
        }

//		console.log('palletData: ', msg)

    });





    function insertPallet() {

        socket.emit('LoadPaper', 'LoadPaper');


        //
        //add_pallet1();
        //addedpallet = true;
        //counter++;
        //socket.emit('LoadPaper', 'LoadPaper');
        //palletlist.push(document.getElementById('pallet' + counter));
        //
        //toPosition.x = config.positions[0].x;
        //toPosition.y = config.positions[0].x;
        ////console.log(" palletX: %s; palletY :%s", palletlist[counter - 1].getAttribute('x'), palletlist[counter - 1].getAttribute('y'));
        //

    }

    function move12() {
        socket.emit('TransZone12', 'TransZone12');

        //if (addedpallet) {
        //    toPosition.x = config.positions[1].x;
        //    toPosition.y = config.positions[1].y;
        //    fromPosition.x = palletlist[counter - 1].getAttribute('x');
        //    fromPosition.y = palletlist[counter - 1].getAttribute('y');
        //
        //    //console.log(" fromPositionX: %s; fromPositionY :%s", fromPosition.x, fromPosition.y);
        //    //console.log(" toPositionX: %s; toPositionY :%s", toPosition.x, toPosition.y);
        //
        //    if (toPosition.x < fromPosition.x) {
        //        move_pallet12();
        //        socket.emit('TransZone12', 'TransZone12');
        //    }
        //}

    }

    function move23() {

        socket.emit('TransZone23', 'TransZone23');

        //if (addedpallet) {
        //    toPosition.x = config.positions[2].x;
        //    toPosition.y = config.positions[2].y;
        //    fromPosition.x = palletlist[counter - 1].getAttribute('x');
        //    fromPosition.y = palletlist[counter - 1].getAttribute('y');
        //
        //    //console.log(" fromPositionX: %s; fromPositionY :%s", fromPosition.x, fromPosition.y);
        //    //console.log(" toPositionX: %s; toPositionY :%s", toPosition.x, toPosition.y);
        //
        //    if (fromPosition.x == config.positions[1].x && toPosition.x < fromPosition.x && toPosition.y == fromPosition.y) {
        //        move_pallet23();
        //        socket.emit('TransZone23', 'TransZone23');
        //    }
        //}

    }

    function move35() {
        socket.emit('TransZone35', 'TransZone35');

        //toPosition.x = config.positions[4].x;
        //toPosition.y = config.positions[4].y;
        //fromPosition.x = palletlist[counter - 1].getAttribute('x');
        //fromPosition.y = palletlist[counter - 1].getAttribute('y');
        //
        ////console.log(" fromPositionX: %s; fromPositionY :%s", fromPosition.x, fromPosition.y);
        ////console.log(" toPositionX: %s; toPositionY :%s", toPosition.x, toPosition.y);
        //
        //if (fromPosition.x == config.positions[2].x && toPosition.x < fromPosition.x && toPosition.y == fromPosition.y) {
        //    move_pallet35();
        //    socket.emit('TransZone35', 'TransZone35');
        //
        //}

    }


    function move14() {
        socket.emit('TransZone14', 'TransZone14');

        //
        //if (addedpallet) {
        //    toPosition.x = config.positions[3].x;
        //    toPosition.y = config.positions[3].y;
        //    fromPosition.x = palletlist[counter - 1].getAttribute('x');
        //    fromPosition.y = palletlist[counter - 1].getAttribute('y');
        //
        //    //console.log(" fromPositionX: %s; fromPositionY :%s", fromPosition.x, fromPosition.y);
        //    //console.log(" toPositionX: %s; toPositionY :%s", toPosition.x, toPosition.y);
        //
        //    if (toPosition.x < fromPosition.x && toPosition.y < fromPosition.y) {
        //        move_pallet14();
        //        socket.emit('TransZone14', 'TransZone14');
        //
        //    }
        //}
    }

    function move45() {
        socket.emit('TransZone45','TransZone45');

        //
        //if (addedpallet) {
        //    toPosition.x = config.positions[4].x;
        //    toPosition.y = config.positions[4].y;
        //    fromPosition.x = palletlist[counter - 1].getAttribute('x');
        //    fromPosition.y = palletlist[counter - 1].getAttribute('y');
        //
        //    //console.log(" fromPositionX: %s; fromPositionY :%s", fromPosition.x, fromPosition.y);
        //    //console.log(" toPositionX: %s; toPositionY :%s", toPosition.x, toPosition.y);
        //
        //    if (fromPosition.x == config.positions[3].x && toPosition.y > fromPosition.y && toPosition.y > fromPosition.y) {
        //        move_pallet45();
        //        socket.emit('TransZone45','TransZone45');
        //
        //    }
        //}

    }

