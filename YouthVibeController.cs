using SchoolServices.Models;
using System;
using System.Web.Http;
using PGEncryption;
using EncryptDecrypt;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Web;
using System.Net.Mail;
using System.Web.Http.Cors;
using System.Collections.Generic;
using System.Xml.Linq;
using System.Xml.Serialization;
using System.IO;
using System.Linq;
using System.Reflection;

namespace SchoolServices.Controllers
{
    
    public class YouthVibeController : ApiController
    {
       

        public class YouthVibeMember
        {
            public string MemberFirstName { get; set; }
            public string MemberLastName { get; set; }
            public string MemberEmail { get; set; }
            public string MemberPhoneNo { get; set; }
            public string MemberRegisteration { get; set; }
            public string MemberTeamName { get; set; }
            public string MemberUniqueID { get; set; }

            public string Gender { get; set; }

        }

        public class YouthVibe
        {
          

            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string PhoneNo { get; set; }
            public string Address { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public bool Student { get; set; }
            public string CollegeUniversity { get; set; }
            public string Eevents { get; set; }
            public string RoleID { get; set; }
            public string UniqueID { get; set; }
            public string TeamName { get; set; }
            public string Amount { get; set; }
            public string Gender { get; set; }
           public string RequireAccomodation { get; set; }
            public DateTime CheckIndate { get; set; }
            public DateTime CheckOutDate { get; set; }
            public string TotalAccomodationFee { get; set; }
            public string NumberofMaleParticipants { get; set; }
            public string NumberofFemaleParticipants { get; set; }
            public string NumberofMaleStaff { get; set; }
            public string NumberofFemaleStaff { get; set; }

            public List<YouthVibeMember> youthList { get; set; }
        }
       

     
        [HttpPost]
        [ActionName("AddyouthVibe2023")]
        [JsonOutput]
        public string AddyouthVibe2023(YouthVibe youthVibe2023)
        {
            string retry = "";
            MyEncryptor Encrypt = new MyEncryptor(string.Empty);
            SHAEncryption sHAEncryption = new SHAEncryption();
            try
            {

                SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["EventConnectionString"].ConnectionString);
                SqlCommand cmd = new SqlCommand();
                DataTable dt = new DataTable();
                cmd.Connection = con;
                string xmlData = "";
                Type t = typeof(YouthVibeMember);
                PropertyInfo[] pia = t.GetProperties();

                //Inspect the properties and create the columns in the DataTable
                foreach (PropertyInfo pi in pia)
                {
                    Type ColumnType = pi.PropertyType;
                    if ((ColumnType.IsGenericType))
                    {
                        ColumnType = ColumnType.GetGenericArguments()[0];
                    }
                    dt.Columns.Add(pi.Name, ColumnType);
                }
                DataSet ds = new DataSet();
                if (youthVibe2023.youthList != null)
                {
                    //Populate the data table
                    foreach (var item in youthVibe2023.youthList)
                    {
                        DataRow dr = dt.NewRow();
                        dr.BeginEdit();
                        foreach (PropertyInfo pi in pia)
                        {
                            if (pi.GetValue(item, null) != null)
                            {
                                dr[pi.Name] = pi.GetValue(item, null);
                            }
                        }
                        dr.EndEdit();
                        dt.Rows.Add(dr);
                    }
                    
                   
                    ds.Tables.Add(dt);
                    xmlData = ds.GetXml();
               }

                //var branchesXml = youthVibe2023.youthList.Select(i => new XElement("youthvibe",
                //                                    new XAttribute("MemberFirstName", i.MemberFirstName),
                //                                    new XAttribute("MemberLastName", i.MemberLastName)));
                //var bodyXml = new XElement("youthvibe", branchesXml);
                con.Open();
                cmd.CommandText = "pInsertYouthVibe2023";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FirstName", youthVibe2023.FirstName);
                cmd.Parameters.AddWithValue("@LastName", youthVibe2023.LastName);
                cmd.Parameters.AddWithValue("@Email", youthVibe2023.Email);
                cmd.Parameters.AddWithValue("@PhoneNo", youthVibe2023.PhoneNo);
                cmd.Parameters.AddWithValue("@Address", youthVibe2023.Address);
                cmd.Parameters.AddWithValue("@City", youthVibe2023.City);
                cmd.Parameters.AddWithValue("@State", youthVibe2023.State);
                cmd.Parameters.AddWithValue("@Student", youthVibe2023.Student);
                cmd.Parameters.AddWithValue("@CollegeUniversity", youthVibe2023.CollegeUniversity);
                cmd.Parameters.AddWithValue("@Eevents", youthVibe2023.Eevents);
                cmd.Parameters.AddWithValue("@RoleID", youthVibe2023.RoleID);
                cmd.Parameters.AddWithValue("@TeamName", youthVibe2023.TeamName);
                cmd.Parameters.AddWithValue("@UniqueID", youthVibe2023.UniqueID);
                cmd.Parameters.AddWithValue("@Amount", youthVibe2023.Amount);
                cmd.Parameters.AddWithValue("@Gender", youthVibe2023.Gender);
                cmd.Parameters.AddWithValue("@RequireAccomodation", youthVibe2023.RequireAccomodation);
                cmd.Parameters.AddWithValue("@CheckIndate", youthVibe2023.CheckIndate);
                cmd.Parameters.AddWithValue("@CheckOutDate", youthVibe2023.CheckOutDate);
                cmd.Parameters.AddWithValue("@NumberofMaleParticipants", youthVibe2023.NumberofMaleParticipants);
                cmd.Parameters.AddWithValue("@NumberofFemaleParticipants", youthVibe2023.NumberofFemaleParticipants);
                cmd.Parameters.AddWithValue("@NumberofMaleStaff", youthVibe2023.NumberofMaleStaff);
                cmd.Parameters.AddWithValue("@NumberofFemaleStaff", youthVibe2023.NumberofFemaleStaff);
                cmd.Parameters.AddWithValue("@TotalAccomodationFee", youthVibe2023.TotalAccomodationFee);
                cmd.Parameters.AddWithValue("@xmlData", xmlData.ToString());

                int id = 0;
                SqlDataAdapter adt = new SqlDataAdapter(cmd);
                DataSet ds1 = new DataSet();
                adt.Fill(ds1);
                string UniqueID = HttpContext.Current.Server.UrlEncode(Encrypt.Encrypt(ds1.Tables[0].Rows[0]["ret"].ToString()));
                string PaymentMode = "Online";
                string order = ds1.Tables[0].Rows[0]["ret"].ToString();
                string name = youthVibe2023.FirstName.Replace(' ', '_') + ' '+youthVibe2023.LastName.Replace(' ', '_');
                string amount = youthVibe2023.Amount;
                string type = "YOUTHVIBE2023";

                string HashData = SHAEncryption.hashKey;
                HashData += "|" + order + "|" + name + "|" + amount + "|" + type;
                string hashedValue = string.Empty;
                if (HashData.Length > 0)
                {
                    hashedValue += sHAEncryption.computeHash(HashData);
                }

                if (PaymentMode == "Online")
                {
                    //Testing Domain
                    //Response.Redirect("http://172.17.60.92/paymentrequesthash.aspx?order=" + Server.UrlEncode(Encrypt.Encrypt(order)) + "&name=" + Server.UrlEncode(Encrypt.Encrypt(name)) + "&amount=" + Server.UrlEncode(Encrypt.Encrypt(amount)) + "&type=" + Server.UrlEncode(Encrypt.Encrypt(type)) + "&hashedValue=" + hashedValue, false);

                    ////Live Domain
                    return "http://payment.lpu.in/paytmrequesthash.aspx?order=" + HttpContext.Current.Server.UrlEncode(Encrypt.Encrypt(order)) + "&name=" + HttpContext.Current.Server.UrlEncode(Encrypt.Encrypt(name)) + "&amount=" + HttpContext.Current.Server.UrlEncode(Encrypt.Encrypt(amount)) + "&type=" + HttpContext.Current.Server.UrlEncode(Encrypt.Encrypt(type)) + "&hashedValue=" + hashedValue + "&email=" + HttpContext.Current.Server.UrlEncode(Encrypt.Encrypt(youthVibe2023.Email)) + "&mobile=" + HttpContext.Current.Server.UrlEncode(Encrypt.Encrypt(youthVibe2023.PhoneNo));

                   // btnSubmit.Enabled = true;
                }
                retry = "error";

                //email_send(youthVibe2023.Email);
            }
            catch (Exception ex)
            {
                retry = "try again";
                //return Json(new { Response = ex.Message.ToString() });
            }
            // return Json(new { Response = "Saved SuccessFully" });

            return retry;
        }

       
    }
}
