window.addEventListener('DOMContentLoaded', function(e) {

    var waterfall = new Waterfall({ minBoxWidth: 250 });

    // button click handle
    var btn = document.getElementById('add-btn');
    var boxHandle = newNode();
    btn.addEventListener('click', function() {

        waterfall.addBox(boxHandle());
    });

    var scaleUpbtn = document.getElementById('scaleup-btn');
    scaleUpbtn.addEventListener('click', function() {

        waterfall.minBoxWidth += 50;
        waterfall.compose(true);
    });

    var scaleDownbtn = document.getElementById('scaledown-btn');
    scaleDownbtn.addEventListener('click', function() {

        waterfall.minBoxWidth -= 50;
        waterfall.compose(true);
    });

    window.onscroll = function() {
        var i = waterfall.getHighestIndex();
        if(i > -1) {
            // get last box of the column
            var lastBox = Array.prototype.slice.call(waterfall.columns[i].children, -1)[0];
            if(checkSlide(lastBox)) {
                var count = 5;
                while(count--) waterfall.addBox(boxHandle());
            }
        }
    };

    function checkSlide(elem) {
        if(elem) {
            var screenHeight = (document.documentElement.scrollTop || document.body.scrollTop) +
                               (document.documentElement.clientHeight || document.body.clientHeight);
            var elemHeight = elem.offsetTop + elem.offsetHeight / 2;

            return elemHeight < screenHeight;
        }
    }


    function getRandomName(infoContainer) {
        var name = '';

        var request = new XMLHttpRequest();

        request.open('GET', 'https://uinames.com/api/?maxlen=75', true);
        request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            name = data.name;
            console.log(name);
        } else {
            name = "error";
        }
        var username = document.createElement('div');
        username.className = "username";
        username.appendChild(document.createTextNode(name));
        infoContainer.appendChild(username);
        var publishTime = document.createElement('div');
        publishTime.className = "publish-time";
        publishTime.appendChild(document.createTextNode('9.11.2018 13:53'));
        infoContainer.appendChild(publishTime);
        }

        request.send();
    }

    function getRandomText(t, p, n) {
        var name = '';

        var request = new XMLHttpRequest();

        let url = "http://www.randomtext.me/api/gibberish/p-1/5-"+n;
        request.open('GET', url, true);
        request.onload = function () {

            // Begin accessing JSON data here
            var data = JSON.parse(this.response);

            if (request.status >= 200 && request.status < 400) {
                //name = data.name;
                t.appendChild(document.createTextNode(data.text_out.slice(3,18)));
                p.appendChild(document.createTextNode(data.text_out.slice(3)));
                console.log(data.text_out);
            } else {
                name = "error";
            }
        }

        request.send();

    }

    function newNode() {
        var size = ['30x30', '30x30', '30x30', '30x30', '30x30'];
        var color = [ 'E97452', '4C6EB4', '449F93', 'D25064', 'E59649' ];
        var length = [ '100', '50', '300', '200', '150' ];
        var i = 0;



        return function() {

            var box = document.createElement('div');
            box.className = 'wf-box';
            var header = document.createElement('div');
            header.className = "card-header";
            var image = document.createElement('img');
            image.src = "http://placehold.it/" + size[i] + '/' + color[i] + '/fff';
            header.appendChild(image);
            var infoContainer = document.createElement('div');
            infoContainer.className="info-container";
            header.appendChild(infoContainer);
            getRandomName(infoContainer);
            box.appendChild(header);

            var content = document.createElement('div');
            content.className = 'content';
            var title = document.createElement('h3');
            content.appendChild(title);
            var p = document.createElement('p');
            content.appendChild(p);
            getRandomText(title, p, length[i]);
            box.appendChild(content);

            var controls = document.createElement('div');
            controls.className = "controls";
            var comment = document.createElement('div');
            comment.className="comment";
            var commentIcon = document.createElement('i');
            commentIcon.className="fa fa-comment";
            comment.appendChild(commentIcon);
            comment.appendChild(document.createTextNode('12'));
            var like = document.createElement('div');
            like.className="like";
            var likeIcon = document.createElement('i');
            likeIcon.className="fa fa-thumbs-up";
            like.appendChild(likeIcon);
            like.appendChild(document.createTextNode('23'));
            controls.appendChild(comment);
            controls.appendChild(like);
            box.appendChild(controls);

            if(++i === size.length) i = 0;

            return box;
        };
    }
});