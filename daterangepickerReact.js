import React, { useState, useEffect, useRef } from 'react';
import getOptions from './get-options.js';
import PropTypes from 'prop-types';
import moment from 'moment';

function DateRangePicker(props) {
    const $picker  = useRef();
    const options = getOptions();

    const [parentEl, setParentEl] = useState(props.parentEl||'body')
    const [element, setElement] = useState(props.element);
    const [startDate, setStartDate] = useState(props.startDate||moment().startOf('day'));
    const [endDate, setEndDate] = useState(moment().endOf('day'));
    const [minDate, setMinDate] = useState(false);
    const [maxDate, setMaxDate] = useState(false);
    const [maxSpan, setMaxSpan] = useState(false);
    const [autoApply, setAutoApply] = useState(false);
    const [singleDatePicker, setSingleDatePicker] = useState(false);
    const [showDropdowns,setShowDropdowns] = useState(false);
    const [minYear, setMinYear] = useState(moment().subtract(100, 'year').format('YYYY'));
    const [maxYear, setMaxYear] = useState(moment().add(100, 'year').format('YYYY'));
    const [showWeekNumbers, setShowWeekNumbers] = useState(false);
    const [showISOWeekNumbers, setShowISOWeekNumberes] = useState(false);
    const [showCustomRangeLabel, setShowCustomRangeLabel] = useState(true);
    const [timePicker, setTimePicker] = useState(false);
    const [timePicker24Hour, setTimePicker24Hour] = useState(false);
    const [timePickerIncrement, setTimePickerIncrement] = useState(1);
    const [timePickerSeconds, setTtimePickerSeconds] = useState(false);
    const [linkedCalendars, setLinkedCalendars] = useState(true);
    const [autoUpdateInput, setAutoUpdateInput] = useState(true);
    const [alwaysShowCalendars, setAlwaysShowCalendars] = useState(false);
    const [ranges, setRanges] = setState({});
    const [opens, setOpens] = useState('right');
    const [drops, setDrops] = useState('down');
    
    const buttonClasses = 'btn btn-sm';
    const applyButtonClasses = 'btn-primary';
    const cancelButtonClasses = 'btn-default';

    const locale = {
        direction: 'ltr',
        format: moment.localeData().longDateFormat('L'),
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: moment.localeData().firstDayOfWeek()
    };

    const callback = function() { };
    
    const [isShowing, setIsShowing] = useState(false);
    const [leftCalendar, setLeftCalendar] = useState({});
    const [rightCalendar, setRightCalendar] = useState({});

    let tempContainerClasses = [props.autoApply?'auto-apply':''];
    
    if (typeof ranges === 'object')
        this.container.addClass('show-ranges');

    if (this.singleDatePicker) {
        this.container.addClass('single');
        this.container.find('.drp-calendar.left').addClass('single');
        this.container.find('.drp-calendar.left').show();
        this.container.find('.drp-calendar.right').hide();
        if (!this.timePicker) {
            this.container.addClass('auto-apply');
        }
    }
    
    const [constainerClasses, setContainerClasses] = useState(tempContainerClasses);

    const setStartDate = (startDate) => {
        if (typeof startDate === 'string')
            this.startDate = moment(startDate, this.locale.format);

        if (typeof startDate === 'object')
            this.startDate = moment(startDate);

        if (!this.timePicker)
            this.startDate = this.startDate.startOf('day');

        if (this.timePicker && this.timePickerIncrement)
            this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

        if (this.minDate && this.startDate.isBefore(this.minDate)) {
            this.startDate = this.minDate.clone();
            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        }

        if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
            this.startDate = this.maxDate.clone();
            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        }

        if (!this.isShowing)
            this.updateElement();

        this.updateMonthsInView();
    },

    const setEndDate = (endDate) => {
        if (typeof endDate === 'string')
            this.endDate = moment(endDate, this.locale.format);

        if (typeof endDate === 'object')
            this.endDate = moment(endDate);

        if (!this.timePicker)
            this.endDate = this.endDate.endOf('day');

        if (this.timePicker && this.timePickerIncrement)
            this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

        if (this.endDate.isBefore(this.startDate))
            this.endDate = this.startDate.clone();

        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        if (this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate))
            this.endDate = this.startDate.clone().add(this.maxSpan);

        this.previousRightTime = this.endDate.clone();

        this.container.find('.drp-selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));

        if (!this.isShowing)
            this.updateElement();

        this.updateMonthsInView();
    },

    const isInvalidDate = () => {
        return false;
    },

    const isCustomDate = () => {
        return false;
    },

    const updateView = () => {
        if (this.timePicker) {
            this.renderTimePicker('left');
            this.renderTimePicker('right');
            if (!this.endDate) {
                this.container.find('.right .calendar-time select').prop('disabled', true).addClass('disabled');
            } else {
                this.container.find('.right .calendar-time select').prop('disabled', false).removeClass('disabled');
            }
        }
        if (this.endDate)
            this.container.find('.drp-selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
        this.updateMonthsInView();
        this.updateCalendars();
        this.updateFormInputs();
    },

    const updateMonthsInView = () => {
        if (this.endDate) {

            //if both dates are visible already, do nothing
            if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                &&
                (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                ) {
                return;
            }

            this.leftCalendar.month = this.startDate.clone().date(2);
            if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                this.rightCalendar.month = this.endDate.clone().date(2);
            } else {
                this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
            }

        } else {
            if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                this.leftCalendar.month = this.startDate.clone().date(2);
                this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
            }
        }
        if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
          this.rightCalendar.month = this.maxDate.clone().date(2);
          this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
        }
    },

    const updateCalendars = () => {

        if (this.timePicker) {
            var hour, minute, second;
            if (this.endDate) {
                hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                if (isNaN(minute)) {
                    minute = parseInt(this.container.find('.left .minuteselect option:last').val(), 10);
                }
                second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                if (!this.timePicker24Hour) {
                    var ampm = this.container.find('.left .ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }
            } else {
                hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                if (isNaN(minute)) {
                    minute = parseInt(this.container.find('.right .minuteselect option:last').val(), 10);
                }
                second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                if (!this.timePicker24Hour) {
                    var ampm = this.container.find('.right .ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }
            }
            this.leftCalendar.month.hour(hour).minute(minute).second(second);
            this.rightCalendar.month.hour(hour).minute(minute).second(second);
        }

        this.renderCalendar('left');
        this.renderCalendar('right');

        //highlight any predefined range matching the current start and end dates
        this.container.find('.ranges li').removeClass('active');
        if (this.endDate == null) return;

        this.calculateChosenLabel();
    },

    const renderCalendar = (side) => {

        //
        // Build the matrix of dates that will populate the calendar
        //

        var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
        var month = calendar.month.month();
        var year = calendar.month.year();
        var hour = calendar.month.hour();
        var minute = calendar.month.minute();
        var second = calendar.month.second();
        var daysInMonth = moment([year, month]).daysInMonth();
        var firstDay = moment([year, month, 1]);
        var lastDay = moment([year, month, daysInMonth]);
        var lastMonth = moment(firstDay).subtract(1, 'month').month();
        var lastYear = moment(firstDay).subtract(1, 'month').year();
        var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
        var dayOfWeek = firstDay.day();

        //initialize a 6 rows x 7 columns array for the calendar
        var calendar = [];
        calendar.firstDay = firstDay;
        calendar.lastDay = lastDay;

        for (var i = 0; i < 6; i++) {
            calendar[i] = [];
        }

        //populate the calendar with date objects
        var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
        if (startDay > daysInLastMonth)
            startDay -= 7;

        if (dayOfWeek == this.locale.firstDay)
            startDay = daysInLastMonth - 6;

        var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

        var col, row;
        for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
            if (i > 0 && col % 7 === 0) {
                col = 0;
                row++;
            }
            calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
            curDate.hour(12);

            if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                calendar[row][col] = this.minDate.clone();
            }

            if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                calendar[row][col] = this.maxDate.clone();
            }

        }

        //make the calendar object available to hoverDate/clickDate
        if (side == 'left') {
            this.leftCalendar.calendar = calendar;
        } else {
            this.rightCalendar.calendar = calendar;
        }

        //
        // Display the calendar
        //

        var minDate = side == 'left' ? this.minDate : this.startDate;
        var maxDate = this.maxDate;
        var selected = side == 'left' ? this.startDate : this.endDate;
        var arrow = this.locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};

        var html = '<table class="table-condensed">';
        html += '<thead>';
        html += '<tr>';

        // add empty cell for week number
        if (this.showWeekNumbers || this.showISOWeekNumbers)
            html += '<th></th>';

        if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
            html += '<th class="prev available"><span></span></th>';
        } else {
            html += '<th></th>';
        }

        var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

        if (this.showDropdowns) {
            var currentMonth = calendar[1][1].month();
            var currentYear = calendar[1][1].year();
            var maxYear = (maxDate && maxDate.year()) || (this.maxYear);
            var minYear = (minDate && minDate.year()) || (this.minYear);
            var inMinYear = currentYear == minYear;
            var inMaxYear = currentYear == maxYear;

            var monthHtml = '<select class="monthselect">';
            for (var m = 0; m < 12; m++) {
                if ((!inMinYear || (minDate && m >= minDate.month())) && (!inMaxYear || (maxDate && m <= maxDate.month()))) {
                    monthHtml += "<option value='" + m + "'" +
                        (m === currentMonth ? " selected='selected'" : "") +
                        ">" + this.locale.monthNames[m] + "</option>";
                } else {
                    monthHtml += "<option value='" + m + "'" +
                        (m === currentMonth ? " selected='selected'" : "") +
                        " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                }
            }
            monthHtml += "</select>";

            var yearHtml = '<select class="yearselect">';
            for (var y = minYear; y <= maxYear; y++) {
                yearHtml += '<option value="' + y + '"' +
                    (y === currentYear ? ' selected="selected"' : '') +
                    '>' + y + '</option>';
            }
            yearHtml += '</select>';

            dateHtml = monthHtml + yearHtml;
        }

        html += '<th colspan="5" class="month">' + dateHtml + '</th>';
        if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
            html += '<th class="next available"><span></span></th>';
        } else {
            html += '<th></th>';
        }

        html += '</tr>';
        html += '<tr>';

        // add week number label
        if (this.showWeekNumbers || this.showISOWeekNumbers)
            html += '<th class="week">' + this.locale.weekLabel + '</th>';

        $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
            html += '<th>' + dayOfWeek + '</th>';
        });

        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';

        //adjust maxDate to reflect the maxSpan setting in order to
        //grey out end dates beyond the maxSpan
        if (this.endDate == null && this.maxSpan) {
            var maxLimit = this.startDate.clone().add(this.maxSpan).endOf('day');
            if (!maxDate || maxLimit.isBefore(maxDate)) {
                maxDate = maxLimit;
            }
        }

        for (var row = 0; row < 6; row++) {
            html += '<tr>';

            // add week number
            if (this.showWeekNumbers)
                html += '<td class="week">' + calendar[row][0].week() + '</td>';
            else if (this.showISOWeekNumbers)
                html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';

            for (var col = 0; col < 7; col++) {

                var classes = [];

                //highlight today's date
                if (calendar[row][col].isSame(new Date(), "day"))
                    classes.push('today');

                //highlight weekends
                if (calendar[row][col].isoWeekday() > 5)
                    classes.push('weekend');

                //grey out the dates in other months displayed at beginning and end of this calendar
                if (calendar[row][col].month() != calendar[1][1].month())
                    classes.push('off', 'ends');

                //don't allow selection of dates before the minimum date
                if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                    classes.push('off', 'disabled');

                //don't allow selection of dates after the maximum date
                if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                    classes.push('off', 'disabled');

                //don't allow selection of date if a custom function decides it's invalid
                if (this.isInvalidDate(calendar[row][col]))
                    classes.push('off', 'disabled');

                //highlight the currently selected start date
                if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                    classes.push('active', 'start-date');

                //highlight the currently selected end date
                if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                    classes.push('active', 'end-date');

                //highlight dates in-between the selected dates
                if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                    classes.push('in-range');

                //apply custom classes for this date
                var isCustom = this.isCustomDate(calendar[row][col]);
                if (isCustom !== false) {
                    if (typeof isCustom === 'string')
                        classes.push(isCustom);
                    else
                        Array.prototype.push.apply(classes, isCustom);
                }

                var cname = '', disabled = false;
                for (var i = 0; i < classes.length; i++) {
                    cname += classes[i] + ' ';
                    if (classes[i] == 'disabled')
                        disabled = true;
                }
                if (!disabled)
                    cname += 'available';

                html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

            }
            html += '</tr>';
        }

        html += '</tbody>';
        html += '</table>';

        this.container.find('.drp-calendar.' + side + ' .calendar-table').html(html);

    },

    const renderTimePicker = (side) => {

        // Don't bother updating the time picker if it's currently disabled
        // because an end date hasn't been clicked yet
        if (side == 'right' && !this.endDate) return;

        var html, selected, minDate, maxDate = this.maxDate;

        if (this.maxSpan && (!this.maxDate || this.startDate.clone().add(this.maxSpan).isBefore(this.maxDate)))
            maxDate = this.startDate.clone().add(this.maxSpan);

        if (side == 'left') {
            selected = this.startDate.clone();
            minDate = this.minDate;
        } else if (side == 'right') {
            selected = this.endDate.clone();
            minDate = this.startDate;

            //Preserve the time already selected
            var timeSelector = this.container.find('.drp-calendar.right .calendar-time');
            if (timeSelector.html() != '') {

                selected.hour(!isNaN(selected.hour()) ? selected.hour() : timeSelector.find('.hourselect option:selected').val());
                selected.minute(!isNaN(selected.minute()) ? selected.minute() : timeSelector.find('.minuteselect option:selected').val());
                selected.second(!isNaN(selected.second()) ? selected.second() : timeSelector.find('.secondselect option:selected').val());

                if (!this.timePicker24Hour) {
                    var ampm = timeSelector.find('.ampmselect option:selected').val();
                    if (ampm === 'PM' && selected.hour() < 12)
                        selected.hour(selected.hour() + 12);
                    if (ampm === 'AM' && selected.hour() === 12)
                        selected.hour(0);
                }

            }

            if (selected.isBefore(this.startDate))
                selected = this.startDate.clone();

            if (maxDate && selected.isAfter(maxDate))
                selected = maxDate.clone();

        }

        //
        // hours
        //

        html = '<select class="hourselect">';

        var start = this.timePicker24Hour ? 0 : 1;
        var end = this.timePicker24Hour ? 23 : 12;

        for (var i = start; i <= end; i++) {
            var i_in_24 = i;
            if (!this.timePicker24Hour)
                i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

            var time = selected.clone().hour(i_in_24);
            var disabled = false;
            if (minDate && time.minute(59).isBefore(minDate))
                disabled = true;
            if (maxDate && time.minute(0).isAfter(maxDate))
                disabled = true;

            if (i_in_24 == selected.hour() && !disabled) {
                html += '<option value="' + i + '" selected="selected">' + i + '</option>';
            } else if (disabled) {
                html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
            } else {
                html += '<option value="' + i + '">' + i + '</option>';
            }
        }

        html += '</select> ';

        //
        // minutes
        //

        html += ': <select class="minuteselect">';

        for (var i = 0; i < 60; i += this.timePickerIncrement) {
            var padded = i < 10 ? '0' + i : i;
            var time = selected.clone().minute(i);

            var disabled = false;
            if (minDate && time.second(59).isBefore(minDate))
                disabled = true;
            if (maxDate && time.second(0).isAfter(maxDate))
                disabled = true;

            if (selected.minute() == i && !disabled) {
                html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
            } else if (disabled) {
                html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
            } else {
                html += '<option value="' + i + '">' + padded + '</option>';
            }
        }

        html += '</select> ';

        //
        // seconds
        //

        if (this.timePickerSeconds) {
            html += ': <select class="secondselect">';

            for (var i = 0; i < 60; i++) {
                var padded = i < 10 ? '0' + i : i;
                var time = selected.clone().second(i);

                var disabled = false;
                if (minDate && time.isBefore(minDate))
                    disabled = true;
                if (maxDate && time.isAfter(maxDate))
                    disabled = true;

                if (selected.second() == i && !disabled) {
                    html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                } else if (disabled) {
                    html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                } else {
                    html += '<option value="' + i + '">' + padded + '</option>';
                }
            }

            html += '</select> ';
        }

        //
        // AM/PM
        //

        if (!this.timePicker24Hour) {
            html += '<select class="ampmselect">';

            var am_html = '';
            var pm_html = '';

            if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                am_html = ' disabled="disabled" class="disabled"';

            if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                pm_html = ' disabled="disabled" class="disabled"';

            if (selected.hour() >= 12) {
                html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
            } else {
                html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
            }

            html += '</select>';
        }

        this.container.find('.drp-calendar.' + side + ' .calendar-time').html(html);

    },

    const updateFormInputs = () => {

        if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
            this.container.find('button.applyBtn').prop('disabled', false);
        } else {
            this.container.find('button.applyBtn').prop('disabled', true);
        }

    },

    const move = () => {
        var parentOffset = { top: 0, left: 0 },
            containerTop;
        var parentRightEdge = $(window).width();
        if (!this.parentEl.is('body')) {
            parentOffset = {
                top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                left: this.parentEl.offset().left - this.parentEl.scrollLeft()
            };
            parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
        }

        if (this.drops == 'up')
            containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
        else
            containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;

        // Force the container to it's actual width
        this.container.css({
          top: 0,
          left: 0,
          right: 'auto'
        });
        var containerWidth = this.container.outerWidth();

        this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('drop-up');

        if (this.opens == 'left') {
            var containerRight = parentRightEdge - this.element.offset().left - this.element.outerWidth();
            if (containerWidth + containerRight > $(window).width()) {
                this.container.css({
                    top: containerTop,
                    right: 'auto',
                    left: 9
                });
            } else {
                this.container.css({
                    top: containerTop,
                    right: containerRight,
                    left: 'auto'
                });
            }
        } else if (this.opens == 'center') {
            var containerLeft = this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                                    - containerWidth / 2;
            if (containerLeft < 0) {
                this.container.css({
                    top: containerTop,
                    right: 'auto',
                    left: 9
                });
            } else if (containerLeft + containerWidth > $(window).width()) {
                this.container.css({
                    top: containerTop,
                    left: 'auto',
                    right: 0
                });
            } else {
                this.container.css({
                    top: containerTop,
                    left: containerLeft,
                    right: 'auto'
                });
            }
        } else {
            var containerLeft = this.element.offset().left - parentOffset.left;
            if (containerLeft + containerWidth > $(window).width()) {
                this.container.css({
                    top: containerTop,
                    left: 'auto',
                    right: 0
                });
            } else {
                this.container.css({
                    top: containerTop,
                    left: containerLeft,
                    right: 'auto'
                });
            }
        }
    },

    const show = (e) => {
        if (this.isShowing) return;

        // Create a click proxy that is private to this instance of datepicker, for unbinding
        this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

        // Bind global datepicker mousedown for hiding and
        $(document)
          .on('mousedown.daterangepicker', this._outsideClickProxy)
          // also support mobile devices
          .on('touchend.daterangepicker', this._outsideClickProxy)
          // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
          .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
          // and also close when focus changes to outside the picker (eg. tabbing between controls)
          .on('focusin.daterangepicker', this._outsideClickProxy);

        // Reposition the picker if the window is resized while it's open
        $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

        this.oldStartDate = this.startDate.clone();
        this.oldEndDate = this.endDate.clone();
        this.previousRightTime = this.endDate.clone();

        this.updateView();
        this.container.show();
        this.move();
        this.element.trigger('show.daterangepicker', this);
        this.isShowing = true;
    },

    const hide = (e) => {
        if (!this.isShowing) return;

        //incomplete date selection, revert to last values
        if (!this.endDate) {
            this.startDate = this.oldStartDate.clone();
            this.endDate = this.oldEndDate.clone();
        }

        //if a new date range was selected, invoke the user callback function
        if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
            this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel);

        //if picker is attached to a text input, update it
        this.updateElement();

        $(document).off('.daterangepicker');
        $(window).off('.daterangepicker');
        this.container.hide();
        this.element.trigger('hide.daterangepicker', this);
        this.isShowing = false;
    },

    const toggle = (e) => {
        if (this.isShowing) {
            this.hide();
        } else {
            this.show();
        }
    },

    const outsideClick = (e) => {
        var target = $(e.target);
        // if the page is clicked anywhere except within the daterangerpicker/button
        // itself then call this.hide()
        if (
            // ie modal dialog fix
            e.type == "focusin" ||
            target.closest(this.element).length ||
            target.closest(this.container).length ||
            target.closest('.calendar-table').length
            ) return;
        this.hide();
        this.element.trigger('outsideClick.daterangepicker', this);
    },

    const showCalendars = () => {
        this.container.addClass('show-calendar');
        this.move();
        this.element.trigger('showCalendar.daterangepicker', this);
    },

    const hideCalendars = () => {
        this.container.removeClass('show-calendar');
        this.element.trigger('hideCalendar.daterangepicker', this);
    },

    const clickRange = (e) => {
        var label = e.target.getAttribute('data-range-key');
        this.chosenLabel = label;
        if (label == this.locale.customRangeLabel) {
            this.showCalendars();
        } else {
            var dates = this.ranges[label];
            this.startDate = dates[0];
            this.endDate = dates[1];

            if (!this.timePicker) {
                this.startDate.startOf('day');
                this.endDate.endOf('day');
            }

            if (!this.alwaysShowCalendars)
                this.hideCalendars();
            this.clickApply();
        }
    },

    const clickPrev = (e) => {
        var cal = $(e.target).parents('.drp-calendar');
        if (cal.hasClass('left')) {
            this.leftCalendar.month.subtract(1, 'month');
            if (this.linkedCalendars)
                this.rightCalendar.month.subtract(1, 'month');
        } else {
            this.rightCalendar.month.subtract(1, 'month');
        }
        this.updateCalendars();
    },

    const clickNext = (e) => {
        var cal = $(e.target).parents('.drp-calendar');
        if (cal.hasClass('left')) {
            this.leftCalendar.month.add(1, 'month');
        } else {
            this.rightCalendar.month.add(1, 'month');
            if (this.linkedCalendars)
                this.leftCalendar.month.add(1, 'month');
        }
        this.updateCalendars();
    },

    const hoverDate = (e) => {

        //ignore dates that can't be selected
        if (!$(e.target).hasClass('available')) return;

        var title = $(e.target).attr('data-title');
        var row = title.substr(1, 1);
        var col = title.substr(3, 1);
        var cal = $(e.target).parents('.drp-calendar');
        var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

        //highlight the dates between the start date and the date being hovered as a potential end date
        var leftCalendar = this.leftCalendar;
        var rightCalendar = this.rightCalendar;
        var startDate = this.startDate;
        if (!this.endDate) {
            this.container.find('.drp-calendar tbody td').each(function(index, el) {

                //skip week numbers, only look at dates
                if ($(el).hasClass('week')) return;

                var title = $(el).attr('data-title');
                var row = title.substr(1, 1);
                var col = title.substr(3, 1);
                var cal = $(el).parents('.drp-calendar');
                var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                    $(el).addClass('in-range');
                } else {
                    $(el).removeClass('in-range');
                }

            });
        }

    },

    const clickDate = (e) => {

        if (!$(e.target).hasClass('available')) return;

        var title = $(e.target).attr('data-title');
        var row = title.substr(1, 1);
        var col = title.substr(3, 1);
        var cal = $(e.target).parents('.drp-calendar');
        var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

        //
        // this function needs to do a few things:
        // * alternate between selecting a start and end date for the range,
        // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
        // * if autoapply is enabled, and an end date was chosen, apply the selection
        // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
        // * if one of the inputs above the calendars was focused, cancel that manual input
        //

        if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
            if (this.timePicker) {
                var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                if (!this.timePicker24Hour) {
                    var ampm = this.container.find('.left .ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }
                var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                if (isNaN(minute)) {
                    minute = parseInt(this.container.find('.left .minuteselect option:last').val(), 10);
                }
                var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                date = date.clone().hour(hour).minute(minute).second(second);
            }
            this.endDate = null;
            this.setStartDate(date.clone());
        } else if (!this.endDate && date.isBefore(this.startDate)) {
            //special case: clicking the same date for start/end,
            //but the time of the end date is before the start date
            this.setEndDate(this.startDate.clone());
        } else { // picking end
            if (this.timePicker) {
                var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                if (!this.timePicker24Hour) {
                    var ampm = this.container.find('.right .ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }
                var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                if (isNaN(minute)) {
                    minute = parseInt(this.container.find('.right .minuteselect option:last').val(), 10);
                }
                var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                date = date.clone().hour(hour).minute(minute).second(second);
            }
            this.setEndDate(date.clone());
            if (this.autoApply) {
              this.calculateChosenLabel();
              this.clickApply();
            }
        }

        if (this.singleDatePicker) {
            this.setEndDate(this.startDate);
            if (!this.timePicker)
                this.clickApply();
        }

        this.updateView();

        //This is to cancel the blur event handler if the mouse was in one of the inputs
        e.stopPropagation();

    },

    const calculateChosenLabel = () => {
        var customRange = true;
        var i = 0;
        for (var range in this.ranges) {
          if (this.timePicker) {
                var format = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
                //ignore times when comparing dates if time picker seconds is not enabled
                if (this.startDate.format(format) == this.ranges[range][0].format(format) && this.endDate.format(format) == this.ranges[range][1].format(format)) {
                    customRange = false;
                    this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                    break;
                }
            } else {
                //ignore times when comparing dates if time picker is not enabled
                if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                    customRange = false;
                    this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                    break;
                }
            }
            i++;
        }
        if (customRange) {
            if (this.showCustomRangeLabel) {
                this.chosenLabel = this.container.find('.ranges li:last').addClass('active').attr('data-range-key');
            } else {
                this.chosenLabel = null;
            }
            this.showCalendars();
        }
    },

    const clickApply = (e) => {
        this.hide();
        this.element.trigger('apply.daterangepicker', this);
    },

    const clickCancel = (e) => {
        this.startDate = this.oldStartDate;
        this.endDate = this.oldEndDate;
        this.hide();
        this.element.trigger('cancel.daterangepicker', this);
    },

    const monthOrYearChanged = (e) => {
        var isLeft = $(e.target).closest('.drp-calendar').hasClass('left'),
            leftOrRight = isLeft ? 'left' : 'right',
            cal = this.container.find('.drp-calendar.'+leftOrRight);

        // Month must be Number for new moment versions
        var month = parseInt(cal.find('.monthselect').val(), 10);
        var year = cal.find('.yearselect').val();

        if (!isLeft) {
            if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                month = this.startDate.month();
                year = this.startDate.year();
            }
        }

        if (this.minDate) {
            if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                month = this.minDate.month();
                year = this.minDate.year();
            }
        }

        if (this.maxDate) {
            if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                month = this.maxDate.month();
                year = this.maxDate.year();
            }
        }

        if (isLeft) {
            this.leftCalendar.month.month(month).year(year);
            if (this.linkedCalendars)
                this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
        } else {
            this.rightCalendar.month.month(month).year(year);
            if (this.linkedCalendars)
                this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
        }
        this.updateCalendars();
    },

    const timeChanged = (e) => {

        var cal = $(e.target).closest('.drp-calendar'),
            isLeft = cal.hasClass('left');

        var hour = parseInt(cal.find('.hourselect').val(), 10);
        var minute = parseInt(cal.find('.minuteselect').val(), 10);
        if (isNaN(minute)) {
            minute = parseInt(cal.find('.minuteselect option:last').val(), 10);
        }
        var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

        if (!this.timePicker24Hour) {
            var ampm = cal.find('.ampmselect').val();
            if (ampm === 'PM' && hour < 12)
                hour += 12;
            if (ampm === 'AM' && hour === 12)
                hour = 0;
        }

        if (isLeft) {
            var start = this.startDate.clone();
            start.hour(hour);
            start.minute(minute);
            start.second(second);
            this.setStartDate(start);
            if (this.singleDatePicker) {
                this.endDate = this.startDate.clone();
            } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                this.setEndDate(start.clone());
            }
        } else if (this.endDate) {
            var end = this.endDate.clone();
            end.hour(hour);
            end.minute(minute);
            end.second(second);
            this.setEndDate(end);
        }

        //update the calendars so all clickable dates reflect the new time component
        this.updateCalendars();

        //update the form inputs above the calendars with the new time
        this.updateFormInputs();

        //re-render the time pickers because changing one selection can affect what's enabled in another
        this.renderTimePicker('left');
        this.renderTimePicker('right');

    },

    const elementChanged = () => {
        if (!this.element.is('input')) return;
        if (!this.element.val().length) return;

        var dateString = this.element.val().split(this.locale.separator),
            start = null,
            end = null;

        if (dateString.length === 2) {
            start = moment(dateString[0], this.locale.format);
            end = moment(dateString[1], this.locale.format);
        }

        if (this.singleDatePicker || start === null || end === null) {
            start = moment(this.element.val(), this.locale.format);
            end = start;
        }

        if (!start.isValid() || !end.isValid()) return;

        this.setStartDate(start);
        this.setEndDate(end);
        this.updateView();
    },

    const keydown = (e) => {
        //hide on tab or enter
        if ((e.keyCode === 9) || (e.keyCode === 13)) {
            this.hide();
        }

        //hide on esc and prevent propagation
        if (e.keyCode === 27) {
            e.preventDefault();
            e.stopPropagation();

            this.hide();
        }
    },

    const updateElement = () => {
        if (this.element.is('input') && this.autoUpdateInput) {
            var newValue = this.startDate.format(this.locale.format);
            if (!this.singleDatePicker) {
                newValue += this.locale.separator + this.endDate.format(this.locale.format);
            }
            if (newValue !== this.element.val()) {
                this.element.val(newValue).trigger('change');
            }
        }
    },

    const remove = () => {
        this.container.remove();
        this.element.off('.daterangepicker');
        this.element.removeData();
    }

    return(
        isShowing && <div class="daterangepicker">
            <div class="ranges"></div>
            <div class="drp-calendar left">
                <div class="calendar-table"></div>
                <div class="calendar-time"></div>
            </div>
            <div class="drp-calendar right">
                <div class="calendar-table"></div>
                <div class="calendar-time"></div>
            </div>
            <div class="drp-buttons">
                <span class="drp-selected"></span>
                <button class="cancelBtn" type="button"></button>
                <button class="applyBtn" disabled="disabled" type="button"></button>
            </div>
        </div>
    )

}