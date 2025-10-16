using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ShoppingCartAPI.Data;
using ShoppingCartAPI.Services;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext - Using InMemory for simplicity
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ShoppingCartDB"));

// Add Services
builder.Services.AddScoped<CartService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddControllers();

// Clerk JWT verification
var clerkIssuer = builder.Configuration["Clerk:Issuer"];
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = clerkIssuer;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = clerkIssuer,
        ValidateAudience = false,
        ValidateLifetime = true
    };
});

// Enable CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173", "http://localhost:5134")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials());
});

var app = builder.Build();

app.UseCors("AllowFrontend");

// Do not force a specific URL here — use launchSettings or dotnet run defaults.

// Add middleware for auth
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Auto-create DB
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    var productService = scope.ServiceProvider.GetRequiredService<ProductService>();
    productService.SeedData();
}

app.Run();
