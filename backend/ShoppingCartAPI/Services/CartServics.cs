using ShoppingCartAPI.Data;
using ShoppingCartAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ShoppingCartAPI.Services
{
    public class CartService
    {
        private readonly AppDbContext _context;
        public CartService(AppDbContext context) => _context = context;

        public Cart GetCart(string userId)
        {
            var cart = _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefault(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
                _context.SaveChanges();
            }

            return cart;
        }

        public Cart AddItem(string userId, int productId, int quantity)
        {
            var cart = GetCart(userId);
            var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);

            if (item != null)
            {
                item.Quantity += quantity;
            }
            else
            {
                var newItem = new CartItem 
                { 
                    CartId = cart.Id,
                    ProductId = productId, 
                    Quantity = quantity 
                };
                _context.CartItems.Add(newItem);
            }

            _context.SaveChanges();
            return GetCart(userId); // Return fresh cart with products
        }

        public void ClearCart(string userId)
        {
            var cart = _context.Carts.Include(c => c.Items).FirstOrDefault(c => c.UserId == userId);
            if (cart != null)
            {
                _context.CartItems.RemoveRange(cart.Items);
                _context.SaveChanges();
            }
        }
    }
}
