using System.ComponentModel.DataAnnotations;

namespace ShoppingCartAPI.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty; // Clerk user ID
        public List<CartItem> Items { get; set; } = new();
    }
}
