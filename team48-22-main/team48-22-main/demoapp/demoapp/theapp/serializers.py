from rest_framework import serializers

from theapp.models import (
    User, MovieTag, LocationTag,
    PostMovie, UserFavorite, UserFriend, UserLike
)


class UserSerializer(serializers.ModelSerializer):

    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    avatar = serializers.ImageField(allow_null=True, required=False)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar', 'email', 'password']

    def validate(self, data):
        if self.instance is None:
            if not data.get('username'):
                raise serializers.ValidationError(
                    {'username': 'This field is required.'})
            if not data.get('email'):
                raise serializers.ValidationError(
                    {'email': 'This field is required.'})
            if User.objects.filter(username=data['username']).exists():
                raise serializers.ValidationError(
                    {'username': 'This username is already taken.'})
            if User.objects.filter(email=data['email']).exists():
                raise serializers.ValidationError(
                    {'email': 'This email is already taken.'})
        return super().validate(data)

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.avatar = validated_data.get('avatar', instance.avatar)
        if validated_data.get('password'):
            instance.set_password(validated_data['password'])
        instance.save()
        return instance


class MovieTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieTag
        fields = ['id', 'tag_name']

    def validate(self, data):
        if self.instance is None:
            try:
                tag = MovieTag.objects.get(tag_name=data['tag_name'])
                self.instance = tag
                return tag
            except:
                pass
        return super().validate(data)


class LocationTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = LocationTag
        fields = ['id', 'tag_name']


class UserFavoriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserFavorite
        fields = ['movie']


class UserFriendSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserFriend
        fields = ['id', 'tag_name']

    def is_valid(self, *, raise_exception=False):
        return super().is_valid(raise_exception=raise_exception)


class UserLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserLike
        fields = ['post']


class PostMovieSerializer(serializers.ModelSerializer):

    tag_list = MovieTagSerializer(many=True)
    location_tag_list = LocationTagSerializer(many=True)
    friend_list = UserFriendSerializer(many=True)

    class Meta:
        model = PostMovie
        fields = ['title', 'introduction', 'avatar',
                  'tag_list', 'location_tag_list', 'friend_list']

    def is_valid(self, *, raise_exception=False):

        validated_data = dict()
        if self.instance is None:
            for wanted in ['tag_list', 'location_tag_list', 'friend_list']:
                if wanted not in self.initial_data:
                    raise serializers.ValidationError(
                        {wanted: 'This field is required.'})

        try:
            for field in self._writable_fields:
                if field.field_name in ['tag_list', 'location_tag_list', 'friend_list']:
                    continue
                else:
                    raw_data = self.initial_data.get(field.field_name, None)
                    if raw_data is not None:
                        validated_data[field.field_name] = field.run_validation(
                            raw_data)
        except Exception as exc:
            self._validated_data = {}
            self._errors = exc.detail
            return False
        else:
            self._errors = {}

        tag_list = [int(t)
                    for t in self.initial_data.get('tag_list', '').split(',')]
        location_list = [int(t) for t in self.initial_data.get(
            'location_tag_list', '').split(',')]
        friend_list = [int(t) for t in self.initial_data.get(
            'friend_list', '').split(',')]
        validated_data['tag_list'] = MovieTag.objects.filter(id__in=tag_list)
        validated_data['location_tag_list'] = LocationTag.objects.filter(
            id__in=location_list)
        validated_data['friend_list'] = UserFriend.objects.filter(
            id__in=friend_list)
        self._validated_data = validated_data
        return True

    def create(self, validated_data):
        movie = PostMovie(
            user=validated_data['user'],
            title=validated_data['title'],
            introduction=validated_data['introduction'],
            avatar=validated_data['avatar'],
        )
        movie.save()
        movie.tag_list.set(validated_data['tag_list'].filter(
            user=validated_data['user']))
        movie.location_tag_list.set(
            validated_data['location_tag_list'].filter(user=validated_data['user']))
        movie.friend_list.set(validated_data['friend_list'].filter(
            user=validated_data['user']))
        return movie

    def save(self, **kwargs):
        return super().save(**kwargs)
