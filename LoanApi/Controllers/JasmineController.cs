using System;
using System.Web.Mvc;

namespace LoanApi.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
