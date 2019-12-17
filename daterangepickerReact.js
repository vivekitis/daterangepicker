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
        container.addClass('show-ranges');

    if (singleDatePicker) {
        container.addClass('single');
        container.find('.drp-calendar.left').addClass('single');
        container.find('.drp-calendar.left').show();
        container.find('.drp-calendar.right').hide();
        if (!timePicker) {
            container.addClass('auto-apply');
        }
    }
    
    const [constainerClasses, setContainerClasses] = useState(tempContainerClasses);

    const setStartDate = (startDate) => {
        if (typeof startDate === 'string')
            startDate = moment(startDate, locale.format);
        else if (typeof startDate === 'object')
            startDate = moment(startDate);

        if (!timePicker)
            startDate = startDate.startOf('day');

        if (timePicker && timePickerIncrement)
            startDate.minute(Math.round(startDate.minute() / timePickerIncrement) * timePickerIncrement);

        if (minDate && startDate.isBefore(minDate)) {
            startDate = minDate.clone();
            if (timePicker && timePickerIncrement)
                startDate.minute(Math.round(startDate.minute() / timePickerIncrement) * timePickerIncrement);
        }

        if (maxDate && startDate.isAfter(maxDate)) {
            startDate = maxDate.clone();
            if (timePicker && timePickerIncrement)
                startDate.minute(Math.floor(startDate.minute() / timePickerIncrement) * timePickerIncrement);
        }

        if (!isShowing)
            updateElement();

        updateMonthsInView();
    },

    const setEndDate = (endDate) => {
        if (typeof endDate === 'string')
            endDate = moment(endDate, locale.format);

        if (typeof endDate === 'object')
            endDate = moment(endDate);

        if (!timePicker)
            endDate = endDate.endOf('day');

        if (timePicker && timePickerIncrement)
            endDate.minute(Math.round(endDate.minute() / timePickerIncrement) * timePickerIncrement);

        if (endDate.isBefore(startDate))
            endDate = startDate.clone();

        if (maxDate && endDate.isAfter(maxDate))
            endDate = maxDate.clone();

        if (maxSpan && startDate.clone().add(maxSpan).isBefore(endDate))
            endDate = startDate.clone().add(maxSpan);

        previousRightTime = endDate.clone();

        container.find('.drp-selected').html(startDate.format(locale.format) + locale.separator + endDate.format(locale.format));

        if (!isShowing)
            updateElement();

        updateMonthsInView();
    },

    const isInvalidDate = () => {
        return false;
    },

    const isCustomDate = () => {
        return false;
    },

    const updateView = () => {
        if (timePicker) {
            renderTimePicker('left');
            renderTimePicker('right');
            if (!endDate) {
                container.find('.right .calendar-time select').prop('disabled', true).addClass('disabled');
            } else {
                container.find('.right .calendar-time select').prop('disabled', false).removeClass('disabled');
            }
        }
        if (endDate)
            container.find('.drp-selected').html(startDate.format(locale.format) + locale.separator + endDate.format(locale.format));
        updateMonthsInView();
        updateCalendars();
        updateFormInputs();
    },

    const updateMonthsInView = () => {
        if (endDate) {

            //if both dates are visible already, do nothing
            if (!singleDatePicker && leftCalendar.month && rightCalendar.month &&
                (startDate.format('YYYY-MM') == leftCalendar.month.format('YYYY-MM') || startDate.format('YYYY-MM') == rightCalendar.month.format('YYYY-MM'))
                &&
                (endDate.format('YYYY-MM') == leftCalendar.month.format('YYYY-MM') || endDate.format('YYYY-MM') == rightCalendar.month.format('YYYY-MM'))
                ) {
                return;
            }

            leftCalendar.month = startDate.clone().date(2);
            if (!linkedCalendars && (endDate.month() != startDate.month() || endDate.year() != startDate.year())) {
                rightCalendar.month = endDate.clone().date(2);
            } else {
                rightCalendar.month = startDate.clone().date(2).add(1, 'month');
            }

        } else {
            if (leftCalendar.month.format('YYYY-MM') != startDate.format('YYYY-MM') && rightCalendar.month.format('YYYY-MM') != startDate.format('YYYY-MM')) {
                leftCalendar.month = startDate.clone().date(2);
                rightCalendar.month = startDate.clone().date(2).add(1, 'month');
            }
        }
        if (maxDate && linkedCalendars && !singleDatePicker && rightCalendar.month > maxDate) {
          rightCalendar.month = maxDate.clone().date(2);
          leftCalendar.month = maxDate.clone().date(2).subtract(1, 'month');
        }
    },

    const updateCalendars = () => {

        if (timePicker) {
            var hour, minute, second;
            if (endDate) {
                hour = parseInt(container.find('.left .hourselect').val(), 10);
                minute = parseInt(container.find('.left .minuteselect').val(), 10);
                if (isNaN(minute)) {
                    minute = parseInt(container.find('.left .minuteselect option:last').val(), 10);
                }
                second = timePickerSeconds ? parseInt(container.find('.left .secondselect').val(), 10) : 0;
                if (!timePicker24Hour) {
                    var ampm = container.find('.left .ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }
            } else {
                hour = parseInt(container.find('.right .hourselect').val(), 10);
                minute = parseInt(container.find('.right .minuteselect').val(), 10);
                if (isNaN(minute)) {
                    minute = parseInt(container.find('.right .minuteselect option:last').val(), 10);
                }
                second = timePickerSeconds ? parseInt(container.find('.right .secondselect').val(), 10) : 0;
                if (!timePicker24Hour) {
                    var ampm = container.find('.right .ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }
            }
            leftCalendar.month.hour(hour).minute(minute).second(second);
            rightCalendar.month.hour(hour).minute(minute).second(second);
        }

        renderCalendar('left');
        renderCalendar('right');

        //highlight any predefined range matching the current start and end dates
        container.find('.ranges li').removeClass('active');
        if (endDate == null) return;

        calculateChosenLabel();
    },

    const renderCalendar = (side) => {

        //
        // Build the matrix of dates that will populate the calendar
        //

        var calendar = side == 'left' ? leftCalendar : rightCalendar;
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
        var startDay = daysInLastMonth - dayOfWeek + locale.firstDay + 1;
        if (startDay > daysInLastMonth)
            startDay -= 7;

        if (dayOfWeek == locale.firstDay)
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

            if (minDate && calendar[row][col].format('YYYY-MM-DD') == minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(minDate) && side == 'left') {
                calendar[row][col] = minDate.clone();
            }

            if (maxDate && calendar[row][col].format('YYYY-MM-DD') == maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(maxDate) && side == 'right') {
                calendar[row][col] = maxDate.clone();
            }

        }

        //make the calendar object available to hoverDate/clickDate
        if (side == 'left') {
            leftCalendar.calendar = calendar;
        } else {
            rightCalendar.calendar = calendar;
        }

        //
        // Display the calendar
        //

        var minDate = side == 'left' ? minDate : startDate;
        var maxDate = maxDate;
        var selected = side == 'left' ? startDate : endDate;
        var arrow = locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};

        var html = '<table class="table-condensed">';
        html += '<thead>';
        html += '<tr>';

        // add empty cell for week number
        if (showWeekNumbers || showISOWeekNumbers)
            html += '<th></th>';

        if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!linkedCalendars || side == 'left')) {
            html += '<th class="prev available"><span></span></th>';
        } else {
            html += '<th></th>';
        }

        var dateHtml = locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

        if (showDropdowns) {
            var currentMonth = calendar[1][1].month();
            var currentYear = calendar[1][1].year();
            var maxYear = (maxDate && maxDate.year()) || (maxYear);
            var minYear = (minDate && minDate.year()) || (minYear);
            var inMinYear = currentYear == minYear;
            var inMaxYear = currentYear == maxYear;

            var monthHtml = '<select class="monthselect">';
            for (var m = 0; m < 12; m++) {
                if ((!inMinYear || (minDate && m >= minDate.month())) && (!inMaxYear || (maxDate && m <= maxDate.month()))) {
                    monthHtml += "<option value='" + m + "'" +
                        (m === currentMonth ? " selected='selected'" : "") +
                        ">" + locale.monthNames[m] + "</option>";
                } else {
                    monthHtml += "<option value='" + m + "'" +
                        (m === currentMonth ? " selected='selected'" : "") +
                        " disabled='disabled'>" + locale.monthNames[m] + "</option>";
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
        if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!linkedCalendars || side == 'right' || singleDatePicker)) {
            html += '<th class="next available"><span></span></th>';
        } else {
            html += '<th></th>';
        }

        html += '</tr>';
        html += '<tr>';

        // add week number label
        if (showWeekNumbers || showISOWeekNumbers)
            html += '<th class="week">' + locale.weekLabel + '</th>';

        $.each(locale.daysOfWeek, function(index, dayOfWeek) {
            html += '<th>' + dayOfWeek + '</th>';
        });

        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';

        //adjust maxDate to reflect the maxSpan setting in order to
        //grey out end dates beyond the maxSpan
        if (endDate == null && maxSpan) {
            var maxLimit = startDate.clone().add(maxSpan).endOf('day');
            if (!maxDate || maxLimit.isBefore(maxDate)) {
                maxDate = maxLimit;
            }
        }

        for (var row = 0; row < 6; row++) {
            html += '<tr>';

            // add week number
            if (showWeekNumbers)
                html += '<td class="week">' + calendar[row][0].week() + '</td>';
            else if (showISOWeekNumbers)
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
                if (minDate && calendar[row][col].isBefore(minDate, 'day'))
                    classes.push('off', 'disabled');

                //don't allow selection of dates after the maximum date
                if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                    classes.push('off', 'disabled');

                //don't allow selection of date if a custom function decides it's invalid
                if (isInvalidDate(calendar[row][col]))
                    classes.push('off', 'disabled');

                //highlight the currently selected start date
                if (calendar[row][col].format('YYYY-MM-DD') == startDate.format('YYYY-MM-DD'))
                    classes.push('active', 'start-date');

                //highlight the currently selected end date
                if (endDate != null && calendar[row][col].format('YYYY-MM-DD') == endDate.format('YYYY-MM-DD'))
                    classes.push('active', 'end-date');

                //highlight dates in-between the selected dates
                if (endDate != null && calendar[row][col] > startDate && calendar[row][col] < endDate)
                    classes.push('in-range');

                //apply custom classes for this date
                var isCustom = isCustomDate(calendar[row][col]);
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

        container.find('.drp-calendar.' + side + ' .calendar-table').html(html);

    },

    const renderTimePicker = (side) => {

        // Don't bother updating the time picker if it's currently disabled
        // because an end date hasn't been clicked yet
        if (side == 'right' && !endDate) return;

        var html, selected, minDate, maxDate = maxDate;

        if (maxSpan && (!maxDate || startDate.clone().add(maxSpan).isBefore(maxDate)))
            maxDate = startDate.clone().add(maxSpan);

        if (side == 'left') {
            selected = startDate.clone();
            minDate = minDate;
        } else if (side == 'right') {
            selected = endDate.clone();
            minDate = startDate;

            //Preserve the time already selected
            var timeSelector = container.find('.drp-calendar.right .calendar-time');
            if (timeSelector.html() != '') {

                selected.hour(!isNaN(selected.hour()) ? selected.hour() : timeSelector.find('.hourselect option:selected').val());
                selected.minute(!isNaN(selected.minute()) ? selected.minute() : timeSelector.find('.minuteselect option:selected').val());
                selected.second(!isNaN(selected.second()) ? selected.second() : timeSelector.find('.secondselect option:selected').val());

                if (!timePicker24Hour) {
                    var ampm = timeSelector.find('.ampmselect option:selected').val();
                    if (ampm === 'PM' && selected.hour() < 12)
                        selected.hour(selected.hour() + 12);
                    if (ampm === 'AM' && selected.hour() === 12)
                        selected.hour(0);
                }

            }

            if (selected.isBefore(startDate))
                selected = startDate.clone();

            if (maxDate && selected.isAfter(maxDate))
                selected = maxDate.clone();

        }

        //
        // hours
        //

        html = '<select class="hourselect">';

        var start = timePicker24Hour ? 0 : 1;
        var end = timePicker24Hour ? 23 : 12;

        for (var i = start; i <= end; i++) {
            var i_in_24 = i;
            if (!timePicker24Hour)
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

        for (var i = 0; i < 60; i += timePickerIncrement) {
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

        if (timePickerSeconds) {
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

        if (!timePicker24Hour) {
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

        container.find('.drp-calendar.' + side + ' .calendar-time').html(html);

    },

    const updateFormInputs = () => {

        if (singleDatePicker || (endDate && (startDate.isBefore(endDate) || startDate.isSame(endDate)))) {
            container.find('button.applyBtn').prop('disabled', false);
        } else {
            container.find('button.applyBtn').prop('disabled', true);
        }

    },

    const move = () => {
        var parentOffset = { top: 0, left: 0 },
            containerTop;
        var parentRightEdge = $(window).width();
        if (!parentEl.is('body')) {
            parentOffset = {
                top: parentEl.offset().top - parentEl.scrollTop(),
                left: parentEl.offset().left - parentEl.scrollLeft()
            };
            parentRightEdge = parentEl[0].clientWidth + parentEl.offset().left;
        }

        if (drops == 'up')
            containerTop = element.offset().top - container.outerHeight() - parentOffset.top;
        else
            containerTop = element.offset().top + element.outerHeight() - parentOffset.top;

        // Force the container to it's actual width
        container.css({
          top: 0,
          left: 0,
          right: 'auto'
        });
        var containerWidth = container.outerWidth();

        container[drops == 'up' ? 'addClass' : 'removeClass']('drop-up');

        if (opens == 'left') {
            var containerRight = parentRightEdge - element.offset().left - element.outerWidth();
            if (containerWidth + containerRight > $(window).width()) {
                container.css({
                    top: containerTop,
                    right: 'auto',
                    left: 9
                });
            } else {
                container.css({
                    top: containerTop,
                    right: containerRight,
                    left: 'auto'
                });
            }
        } else if (opens == 'center') {
            var containerLeft = element.offset().left - parentOffset.left + element.outerWidth() / 2
                                    - containerWidth / 2;
            if (containerLeft < 0) {
                container.css({
                    top: containerTop,
                    right: 'auto',
                    left: 9
                });
            } else if (containerLeft + containerWidth > $(window).width()) {
                container.css({
                    top: containerTop,
                    left: 'auto',
                    right: 0
                });
            } else {
                container.css({
                    top: containerTop,
                    left: containerLeft,
                    right: 'auto'
                });
            }
        } else {
            var containerLeft = element.offset().left - parentOffset.left;
            if (containerLeft + containerWidth > $(window).width()) {
                container.css({
                    top: containerTop,
                    left: 'auto',
                    right: 0
                });
            } else {
                container.css({
                    top: containerTop,
                    left: containerLeft,
                    right: 'auto'
                });
            }
        }
    },

    const show = (e) => {
        if (isShowing) return;

        // Create a click proxy that is private to this instance of datepicker, for unbinding
        _outsideClickProxy = $.proxy(function(e) { outsideClick(e); }, this);

        // Bind global datepicker mousedown for hiding and
        $(document)
          .on('mousedown.daterangepicker', _outsideClickProxy)
          // also support mobile devices
          .on('touchend.daterangepicker', _outsideClickProxy)
          // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
          .on('click.daterangepicker', '[data-toggle=dropdown]', _outsideClickProxy)
          // and also close when focus changes to outside the picker (eg. tabbing between controls)
          .on('focusin.daterangepicker', _outsideClickProxy);

        // Reposition the picker if the window is resized while it's open
        $(window).on('resize.daterangepicker', $.proxy(function(e) { move(e); }, this));

        oldStartDate = startDate.clone();
        oldEndDate = endDate.clone();
        previousRightTime = endDate.clone();

        updateView();
        container.show();
        move();
        element.trigger('show.daterangepicker', this);
        isShowing = true;
    },

    const hide = (e) => {
        if (!isShowing) return;

        //incomplete date selection, revert to last values
        if (!endDate) {
            startDate = oldStartDate.clone();
            endDate = oldEndDate.clone();
        }

        //if a new date range was selected, invoke the user callback function
        if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate))
            callback(startDate.clone(), endDate.clone(), chosenLabel);

        //if picker is attached to a text input, update it
        updateElement();

        $(document).off('.daterangepicker');
        $(window).off('.daterangepicker');
        container.hide();
        element.trigger('hide.daterangepicker', this);
        isShowing = false;
    },

    const toggle = (e) => {
        if (isShowing) {
            hide();
        } else {
            show();
        }
    },

    const outsideClick = (e) => {
        var target = $(e.target);
        // if the page is clicked anywhere except within the daterangerpicker/button
        // itself then call hide()
        if (
            // ie modal dialog fix
            e.type == "focusin" ||
            target.closest(element).length ||
            target.closest(container).length ||
            target.closest('.calendar-table').length
            ) return;
        hide();
        element.trigger('outsideClick.daterangepicker', this);
    },

    const showCalendars = () => {
        container.addClass('show-calendar');
        move();
        element.trigger('showCalendar.daterangepicker', this);
    },

    const hideCalendars = () => {
        container.removeClass('show-calendar');
        element.trigger('hideCalendar.daterangepicker', this);
    },

    const clickRange = (e) => {
        var label = e.target.getAttribute('data-range-key');
        chosenLabel = label;
        if (label == locale.customRangeLabel) {
            showCalendars();
        } else {
            var dates = ranges[label];
            startDate = dates[0];
            endDate = dates[1];

            if (!timePicker) {
                startDate.startOf('day');
                endDate.endOf('day');
            }

            if (!alwaysShowCalendars)
                hideCalendars();
            clickApply();
        }
    },

    const clickPrev = (e) => {
        var cal = $(e.target).parents('.drp-calendar');
        if (cal.hasClass('left')) {
            leftCalendar.month.subtract(1, 'month');
            if (linkedCalendars)
                rightCalendar.month.subtract(1, 'month');
        } else {
            rightCalendar.month.subtract(1, 'month');
        }
        updateCalendars();
    },

    const clickNext = (e) => {
        var cal = $(e.target).parents('.drp-calendar');
        if (cal.hasClass('left')) {
            leftCalendar.month.add(1, 'month');
        } else {
            rightCalendar.month.add(1, 'month');
            if (linkedCalendars)
                leftCalendar.month.add(1, 'month');
        }
        updateCalendars();
    },

    const hoverDate = (e) => {

        //ignore dates that can't be selected
        if (!$(e.target).hasClass('available')) return;

        var title = $(e.target).attr('data-title');
        var row = title.substr(1, 1);
        var col = title.substr(3, 1);
        var cal = $(e.target).parents('.drp-calendar');
        var date = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

        //highlight the dates between the start date and the date being hovered as a potential end date
        var leftCalendar = leftCalendar;
        var rightCalendar = rightCalendar;
        var startDate = startDate;
        if (!endDate) {
            container.find('.drp-calendar tbody td').each(function(index, el) {

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
        var date = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

        //
        // this function needs to do a few things:
        // * alternate between selecting a start and end date for the range,
        // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
        // * if autoapply is enabled, and an end date was chosen, apply the selection
        // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
        // * if one of the inputs above the calendars was focused, cancel that manual input
        //

        if (endDate || date.isBefore(startDate, 'day')) { //picking start
            if (timePicker) {
                var hour = parseInt(container.find('.left .hourselect').val(), 10);
                if (!timePicker24Hour) {
                    var ampm = container.find('.left .ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }
                var minute = parseInt(container.find('.left .minuteselect').val(), 10);
                if (isNaN(minute)) {
                    minute = parseInt(container.find('.left .minuteselect option:last').val(), 10);
                }
                var second = timePickerSeconds ? parseInt(container.find('.left .secondselect').val(), 10) : 0;
                date = date.clone().hour(hour).minute(minute).second(second);
            }
            endDate = null;
            setStartDate(date.clone());
        } else if (!endDate && date.isBefore(startDate)) {
            //special case: clicking the same date for start/end,
            //but the time of the end date is before the start date
            setEndDate(startDate.clone());
        } else { // picking end
            if (timePicker) {
                var hour = parseInt(container.find('.right .hourselect').val(), 10);
                if (!timePicker24Hour) {
                    var ampm = container.find('.right .ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }
                var minute = parseInt(container.find('.right .minuteselect').val(), 10);
                if (isNaN(minute)) {
                    minute = parseInt(container.find('.right .minuteselect option:last').val(), 10);
                }
                var second = timePickerSeconds ? parseInt(container.find('.right .secondselect').val(), 10) : 0;
                date = date.clone().hour(hour).minute(minute).second(second);
            }
            setEndDate(date.clone());
            if (autoApply) {
              calculateChosenLabel();
              clickApply();
            }
        }

        if (singleDatePicker) {
            setEndDate(startDate);
            if (!timePicker)
                clickApply();
        }

        updateView();

        //This is to cancel the blur event handler if the mouse was in one of the inputs
        e.stopPropagation();

    },

    const calculateChosenLabel = () => {
        var customRange = true;
        var i = 0;
        for (var range in ranges) {
          if (timePicker) {
                var format = timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
                //ignore times when comparing dates if time picker seconds is not enabled
                if (startDate.format(format) == ranges[range][0].format(format) && endDate.format(format) == ranges[range][1].format(format)) {
                    customRange = false;
                    chosenLabel = container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                    break;
                }
            } else {
                //ignore times when comparing dates if time picker is not enabled
                if (startDate.format('YYYY-MM-DD') == ranges[range][0].format('YYYY-MM-DD') && endDate.format('YYYY-MM-DD') == ranges[range][1].format('YYYY-MM-DD')) {
                    customRange = false;
                    chosenLabel = container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                    break;
                }
            }
            i++;
        }
        if (customRange) {
            if (showCustomRangeLabel) {
                chosenLabel = container.find('.ranges li:last').addClass('active').attr('data-range-key');
            } else {
                chosenLabel = null;
            }
            showCalendars();
        }
    },

    const clickApply = (e) => {
        hide();
        element.trigger('apply.daterangepicker', this);
    },

    const clickCancel = (e) => {
        startDate = oldStartDate;
        endDate = oldEndDate;
        hide();
        element.trigger('cancel.daterangepicker', this);
    },

    const monthOrYearChanged = (e) => {
        var isLeft = $(e.target).closest('.drp-calendar').hasClass('left'),
            leftOrRight = isLeft ? 'left' : 'right',
            cal = container.find('.drp-calendar.'+leftOrRight);

        // Month must be Number for new moment versions
        var month = parseInt(cal.find('.monthselect').val(), 10);
        var year = cal.find('.yearselect').val();

        if (!isLeft) {
            if (year < startDate.year() || (year == startDate.year() && month < startDate.month())) {
                month = startDate.month();
                year = startDate.year();
            }
        }

        if (minDate) {
            if (year < minDate.year() || (year == minDate.year() && month < minDate.month())) {
                month = minDate.month();
                year = minDate.year();
            }
        }

        if (maxDate) {
            if (year > maxDate.year() || (year == maxDate.year() && month > maxDate.month())) {
                month = maxDate.month();
                year = maxDate.year();
            }
        }

        if (isLeft) {
            leftCalendar.month.month(month).year(year);
            if (linkedCalendars)
                rightCalendar.month = leftCalendar.month.clone().add(1, 'month');
        } else {
            rightCalendar.month.month(month).year(year);
            if (linkedCalendars)
                leftCalendar.month = rightCalendar.month.clone().subtract(1, 'month');
        }
        updateCalendars();
    },

    const timeChanged = (e) => {

        var cal = $(e.target).closest('.drp-calendar'),
            isLeft = cal.hasClass('left');

        var hour = parseInt(cal.find('.hourselect').val(), 10);
        var minute = parseInt(cal.find('.minuteselect').val(), 10);
        if (isNaN(minute)) {
            minute = parseInt(cal.find('.minuteselect option:last').val(), 10);
        }
        var second = timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

        if (!timePicker24Hour) {
            var ampm = cal.find('.ampmselect').val();
            if (ampm === 'PM' && hour < 12)
                hour += 12;
            if (ampm === 'AM' && hour === 12)
                hour = 0;
        }

        if (isLeft) {
            var start = startDate.clone();
            start.hour(hour);
            start.minute(minute);
            start.second(second);
            setStartDate(start);
            if (singleDatePicker) {
                endDate = startDate.clone();
            } else if (endDate && endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && endDate.isBefore(start)) {
                setEndDate(start.clone());
            }
        } else if (endDate) {
            var end = endDate.clone();
            end.hour(hour);
            end.minute(minute);
            end.second(second);
            setEndDate(end);
        }

        //update the calendars so all clickable dates reflect the new time component
        updateCalendars();

        //update the form inputs above the calendars with the new time
        updateFormInputs();

        //re-render the time pickers because changing one selection can affect what's enabled in another
        renderTimePicker('left');
        renderTimePicker('right');

    },

    const elementChanged = () => {
        if (!element.is('input')) return;
        if (!element.val().length) return;

        var dateString = element.val().split(locale.separator),
            start = null,
            end = null;

        if (dateString.length === 2) {
            start = moment(dateString[0], locale.format);
            end = moment(dateString[1], locale.format);
        }

        if (singleDatePicker || start === null || end === null) {
            start = moment(element.val(), locale.format);
            end = start;
        }

        if (!start.isValid() || !end.isValid()) return;

        setStartDate(start);
        setEndDate(end);
        updateView();
    },

    const keydown = (e) => {
        //hide on tab or enter
        if ((e.keyCode === 9) || (e.keyCode === 13)) {
            hide();
        }

        //hide on esc and prevent propagation
        if (e.keyCode === 27) {
            e.preventDefault();
            e.stopPropagation();

            hide();
        }
    },

    const updateElement = () => {
        if (element.is('input') && autoUpdateInput) {
            var newValue = startDate.format(locale.format);
            if (!singleDatePicker) {
                newValue += locale.separator + endDate.format(locale.format);
            }
            if (newValue !== element.val()) {
                element.val(newValue).trigger('change');
            }
        }
    },

    const remove = () => {
        container.remove();
        element.off('.daterangepicker');
        element.removeData();
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