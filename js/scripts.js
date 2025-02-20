The json has these fields

id, customerId, productId, creditCharge, pointsEarned, statusProcessed, creationDate, lastUpdateDate, category, multiplier, productName

please dont send everything to the excel, instead send Customer name, Credit Card Name, Category, Charge, Points, Processed Status, Transaction Date, customer name will simply be customer.name, dont worry for its logic its in rest of the code

  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = 'transaction_history.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Successfully Downloaded", { theme: 'light' });
  }
