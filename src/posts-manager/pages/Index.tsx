
import { Button } from "@/posts-manager/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/posts-manager/components/ui/card";
import { File, Edit, Tag, Image } from "lucide-react";
import { Link } from "react-router";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Blog Post Management System
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Create, edit, and manage your blog posts with powerful multi-language support, 
            rich content editing, and comprehensive categorization features.
          </p>
          <Link to="/posts">
            <Button size="lg" className="px-8 py-3 text-lg">
              Get Started with Posts
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <File className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Full CRUD Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create, read, update, and delete posts with a complete management interface.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Edit className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Multi-Language Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Write your posts in both English and French with dedicated content editors.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Tag className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Smart Categorization</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Organize posts with categories and tags. Create new ones on the fly.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Rich Media</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add featured images and rich text content with our integrated editors.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Demo Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Try the Demo</CardTitle>
              <CardDescription>
                Experience the full functionality with sample data and create your own posts.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <Link to="/posts">
                  <Button variant="default" className="w-full">
                    <File className="h-4 w-4 mr-2" />
                    View All Posts
                  </Button>
                </Link>
                <Link to="/posts">
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                All changes are stored in memory for this demo
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
