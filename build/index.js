"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const timerTrigger = async function (context, myTimer) {
    const timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    await (0, main_1.main)();
    context.log('Timer trigger function ran!', timeStamp);
};
exports.default = timerTrigger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9LZXhhL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQThCO0FBRTlCLE1BQU0sWUFBWSxHQUFrQixLQUFLLFdBQVcsT0FBZ0IsRUFBRSxPQUFZO0lBQzlFLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFM0MsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUNyQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUNsRDtJQUNELE1BQU0sSUFBQSxXQUFJLEdBQUUsQ0FBQztJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDMUQsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsWUFBWSxDQUFDIn0=