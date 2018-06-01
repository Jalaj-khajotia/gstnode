CREATE DEFINER=`gstapp`@`%` PROCEDURE `GetGSTReport`(year INT, gstFormType INT, period INT)
BEGIN
Select client.tradename, client.codeno, client.gstin,client.dealertype,  gst.gststatus, gst.gstpendingstatus, 
 gst.receiptDate, gst.fillingDate, gst.remark from GST.ClientGsts gst
inner join GST.ClientInfos client
on client.id = gst.clientInfoId
 where gst.year=year and gst.gstFormType=gstFormType and gst.period = period;
END