import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService, Post } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login', () => {
    const mockResponse = { token: 'fakeToken' };
    const username = 'testUser';
    const password = 'testPass';

    service.login(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username, password });
    req.flush(mockResponse);
  });

  it('should perform logout', () => {
    const mockResponse = { success: true };

    service.logout().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/logout`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get posts', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Post 1', content: 'Content 1' },
      { id: 2, title: 'Post 2', content: 'Content 2' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should create a post', () => {
    const newPost: Post = { title: 'New Post', content: 'New Content' };
    const mockResponse: Post = { id: 1, ...newPost };

    service.createPost(newPost).subscribe(post => {
      expect(post).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPost);
    req.flush(mockResponse);
  });

  it('should get a single post by ID', () => {
    const mockPost: Post = { id: 1, title: 'Post 1', content: 'Content 1' };

    service.getPost(1).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should update a post', () => {
    const updatedPost: Post = { id: 1, title: 'Updated Post', content: 'Updated Content' };

    service.updatePost(1, updatedPost).subscribe(post => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedPost);
    req.flush(updatedPost);
  });

  it('should delete a post', () => {
    const mockResponse = { success: true };

    service.deletePost(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should get protected resource with headers', () => {
    const mockResponse = { data: 'protected data' };
    const token = 'fakeToken';
    localStorage.setItem('token', token);

    service.getProtectedResource().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/protected-resource`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(mockResponse);
  });

  it('should perform login with Facebook', () => {
    const mockResponse = { success: true };

    service.loginWithFacebook().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/auth/facebook`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should perform login with Google', () => {
    const mockResponse = { success: true };

    service.loginWithGoogle().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/auth/google`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
