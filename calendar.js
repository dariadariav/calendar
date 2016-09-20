var Calendar = function(container, point) {

	this.week = ["Пн","Вт","Ср","Чт","Пт","Сб", "Вс"];
	this.months = [
		"Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
		"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
	];
	this.day = 86400000;
	this.month = 2592000000;
	this.dayMonth = new Date;
	this.events = {};
	this.events['1-09-16'] = 'gfdgdf';
	this.events['10-09-16'] = 'gdgdfg';
	this.events['12-09-16'] = 'fdgdfg';
	this._container = container ? container : new TypeError ('container not founded.');
	if(Date.prototype.isPrototypeOf(point))
		this._point = point;
	else new TypeError('point is not date object.');

	this.draw();
}

Calendar.prototype.draw = function(){

	var dayPoint = new Date(this._point.getTime());

	dayPoint.setDate(1);

	var numMonth = dayPoint.getMonth();

	var firstDay = dayPoint.getDay();

	if (firstDay==0){

		dayPoint.setDate(-6);
	}

	else {

		dayPoint.setDate(1-firstDay);
	}

	var lastMonthDay = dayPoint.getTime();

	this._container.innerHTML = '';

	var btnPrev = document.createElement('input');
	btnPrev.type = 'button';
	btnPrev.value = 'Назад';
	btnPrev.addEventListener('click', this.prevMonth.bind(this));

	var headerMonth = document.createElement('span');
	headerMonth.innerHTML = this.months[numMonth];

	var btnNext = document.createElement('input');
	btnNext.type = 'button';
	btnNext.value = 'Вперед';
	btnNext.addEventListener('click', this.nextMonth.bind(this));

	this._container.appendChild(btnPrev);
	this._container.appendChild(headerMonth);
	this._container.appendChild(btnNext);

	var table = document.createElement('table');
	this._container.appendChild(table);

	var trWeek = document.createElement('tr');
	table.appendChild(trWeek);

	for (d=0;d<7;d++){

		var tdWeek = document.createElement('td');
		trWeek.appendChild(tdWeek);
		tdWeek.innerHTML = this.week[d];
	}

	for(i=0;i<6;i++){

		var tr = document.createElement('tr');
		table.appendChild(tr);

		for(j=0;j<7;j++){

			var td = document.createElement('td');
			tr.appendChild(td);
			thisDay = lastMonthDay+this.day;
			this.dayMonth = new Date(thisDay);
			day = this.dayMonth.getDate();
			td.innerHTML = day;
			this.day = this.day+86400000;
		}

	}

	this.day = 86400000;

	this._container.appendChild(table);
}

Calendar.prototype.prevMonth = function(){

	thisMonth = this._point.getTime();
	m = thisMonth-86400000*28;

	this._point = new Date(m);
	
	this.draw();
}

Calendar.prototype.nextMonth = function(){

	thisMonth = this._point.getTime();
	m = thisMonth+86400000*28;

	this._point = new Date(m);
	
	this.draw();
}





