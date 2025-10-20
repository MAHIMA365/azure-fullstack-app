using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoppingCartAPI.Services;

namespace ShoppingCartAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _service;
        public ProductsController(ProductService service) => _service = service;

        [HttpGet]
        [AllowAnonymous]  // Make products public for all customers
        public IActionResult GetAll() => Ok(_service.GetAll());
    }
}
