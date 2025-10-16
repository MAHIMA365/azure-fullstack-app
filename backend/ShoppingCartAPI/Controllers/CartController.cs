using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoppingCartAPI.Services;
using System.Security.Claims;

namespace ShoppingCartAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]  // 🔒 Protect all endpoints
    public class CartController : ControllerBase
    {
        private readonly CartService _service;
        public CartController(CartService service) => _service = service;

        private string GetUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier) ?? 
                   throw new UnauthorizedAccessException("User ID not found in token");
        }

        [HttpGet]
        public IActionResult GetCart()
        {
            var userId = GetUserId();
            return Ok(_service.GetCart(userId));
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody] AddToCartRequest request)
        {
            var userId = GetUserId();
            var cart = _service.AddItem(userId, request.ProductId, request.Quantity);
            return Ok(cart);
        }

        [HttpDelete]
        public IActionResult Clear()
        {
            var userId = GetUserId();
            _service.ClearCart(userId);
            return Ok();
        }
    }

    public class AddToCartRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
