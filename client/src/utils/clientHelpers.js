

//func for converting 'date' js recieved obj into dd/mm/yyyy format string
// note : the format we recieve date is in a js obj but in string type "2024-02-10T13:49:44.000Z" so we need to convert this to date obj like 2024-02-10T13:49:44.000Z then we apply the process to convert it in a dd/mm/yyyy formate
export const dateFormatter = (date) => { 
    var incomeCreationDate = new Date(date);
    var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    var formattedDate = incomeCreationDate.toLocaleDateString('en-GB', options);
    return formattedDate;
}