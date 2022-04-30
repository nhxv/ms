package com.nhxv.bookstorebackend.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.http.ResponseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @NotBlank
    @Column
    private String email;

    @NotBlank
    @Column(length = 72)
    @JsonIgnore
    private String password;

    @NotBlank
    @Column
    private String name;

    @NotBlank
    @Column
    private String address;

    @NotBlank
    @Column(length = 15)
    private String phone;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "account_id")
    private List<CartItem> cart;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "account")
    private List<AccountOrder> accountOrders;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "account")
    private List<Review> reviews;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "ACCOUNT_ROLES",
            joinColumns = {@JoinColumn(name = "ACCOUNT_ID")},
            inverseJoinColumns = {@JoinColumn(name = "ROLE_ID")})
    private Set<Role> roles;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<AccountOrder> getAccountOrders() {
        return accountOrders;
    }

    public void setAccountOrders(List<AccountOrder> accountOrders) {
        this.accountOrders = accountOrders;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<CartItem> getCart() {
        return cart;
    }

    public void setCart(List<CartItem> newCart) {
        if (newCart != null && !newCart.isEmpty()) {
            if (this.cart.isEmpty()) {
                this.cart.addAll(newCart);
            } else { // merge new cart with existing cart
                /*
                ** Avoid modify this.cart collection
                ** https://stackoverflow.com/questions/5587482/hibernate-a-collection-with-cascade-all-delete-orphan-was-no-longer-referenc
                */
                List<CartItem> currentCart = new ArrayList<>(this.cart);
                for (CartItem newCartItem : newCart) {
                    int sameItemIndex = -1;
                    for (int i = 0; i < currentCart.size(); i++) {
                        if (newCartItem.getBookId() == currentCart.get(i).getBookId()) {
                            sameItemIndex = i;
                            break;
                        }
                    }
                    if (sameItemIndex == -1) { // new item
                        currentCart.add(newCartItem);
                    } else { // existing items, modify quantity
                        currentCart.get(sameItemIndex).setQuantity(
                                Math.min(currentCart.get(sameItemIndex).getQuantity() + newCartItem.getQuantity(), 10)
                        );
                    }
                }
                this.cart.clear();
                this.cart.addAll(
                        currentCart.stream()
                        .filter(cartItem -> cartItem.getQuantity() > 0)
                        .collect(Collectors.toList())
                );
            }
        } else {
            this.cart.clear();
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return id == account.id && Objects.equals(email, account.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email);
    }
}
